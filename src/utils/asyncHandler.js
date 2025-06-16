const asyncHandler = (requestHandler) => async (req, res, next) => {
    try {
        await requestHandler(req, res, next);
    } catch (error) {
        console.error("Error in async handler:", error);
        res.status(500).json(
            { message: "Internal Server Error" ,
                success: false,
            });
    }
    };

export default asyncHandler;