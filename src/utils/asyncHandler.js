export default asyncHandler = (fn) = async (req, res, next) => {
    try {
        await fn(req, res, next);
    }catch (error){
        console.error("Error in asyncHandler:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}