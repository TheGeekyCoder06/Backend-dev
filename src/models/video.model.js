import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoSchema = new Schema(
  {
    // Define your schema fields here, e.g.:
    videoFile : {
        type: String,
        required : true, // url link 
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    url: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      default: "https://example.com/default-thumbnail.png",
    },
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    duration: {
        type: Number,
        required: true, // Duration in seconds
    },
    isPublished : {
        type: Boolean,
        default: false, // Default to false, meaning the video is not published
    },
    owner : {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true, // Owner of the video 
    }
  },
  {
    timestamps: true, // Correct placement for createdAt and updatedAt
  }
);

videoSchema.plugin(mongooseAggregatePaginate);

export const Video = mongoose.model("Video", videoSchema);
