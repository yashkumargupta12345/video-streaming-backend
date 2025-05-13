import asyncHandler from "../utils/asyncHandler.js"
import User from "../models/User.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"

const registerUser = asyncHandler( async (req, res) => {
    const {fullname , username, email, password} = req.body;
    console.log("email: ", email);

    if([fullname, username, email, password].some((field) => 
        field?.trim() === "")) {
        return res.status(400).json({
            success: false,
            message: "Please fill all the fields"
        })
    }
    User.findOne({
        $or: [ {username}, {email}]
    }).then(async (user) => {
    if(existedUser) {
        return res.status(400).json({
            success: false,
            message: "User already exists"
        }) 
    }})
        
    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path

    if(!avatarLocalPath || !coverImageLocalPath) {
        return res.status(400).json({
            success: false,
            message: "Please upload avatar and cover image"
        })
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    const user = await User.create({
        fullname, 
        avatar : avatar.url,
        coverimage : coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase(),
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if(!createdUser){
        return res.status(400).json({
            success: false,
            message: "User not created"
        })
    }

    res.status(201).json({
        success: true,
        message: "User created successfully",
        user: createdUser
    })
})



export default registerUser;