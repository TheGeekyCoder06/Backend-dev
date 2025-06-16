import mongoose , {Schema} from "mongoose";
import jwt from 'jsonwebtoken';
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import bcrypt from 'bcrypt';
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            index : true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        fullname:{
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        avatar: {
            type: String,
            default: "https://example.com/default-avatar.png", // Default avatar URL cloudinary
            required: true
        },
        coverImage: {
            type: String,
            default: "https://example.com/default-cover.png", // Default cover image URL cloudinary
        },
        watchHistory: [
            {
            type: Schema.Types.ObjectId,
            ref: "Video",
            }
        ],
        password : {
            type: String,
            required: [true, "Password is required"],
        },
        refreshToken: {
            type: String,
            default: null,
        },

    },{
        timestamps: true, // Automatically manage createdAt and updatedAt fields    
    }
)

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.isPasswordCorrect = async function(password) {
   return await bcrypt.compare(password , this.password)
}

userSchema.methods.generateAccessToken = async function(password) {
    return await bcrypt.compare(password , this.password)
}

userSchema.methods.generateRefreshToken = async function(password) {
    const payload = {
        userId: this._id,
      };
    
      const secret = process.env.ACCESS_TOKEN_SECRET; // fix spelling if needed
    
      const options = {
        expiresIn: "1h",
      };
    
      return jwt.sign(payload, secret, options);
}

userSchema.methods.generateAccessToken = function () {
    const payload = {
      userId: this._id,
    };
  
    const secret = process.env.ACCESS_TOKEN_SECRET; // fix spelling if needed
  
    const options = {
      expiresIn: "1h",
    };
  
    return jwt.sign(payload, secret, options);
};
 
    
export const User = mongoose.model("User", userSchema);