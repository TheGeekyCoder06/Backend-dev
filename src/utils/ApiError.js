class ApiError extends Error {
    constructor(
      statusCode,
      message = "Something went wrong",
      error = [],
      stack = ""
    ) {
      super(message);
      this.statusCode = statusCode;
      this.error = error;
      this.message = message;
      this.success = false;
      this.timestamp = new Date().toISOString();
  
      // Stack trace assignment should be inside the constructor
      if (stack) {
        this.stack = stack;
      } else {
        Error.captureStackTrace(this, this.constructor);
      }
    }
  }
  
  export default ApiError;
  