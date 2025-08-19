import asynHandler from "../utils/aysnhandler.js"
import {ApiError} from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import {User} from '../models/user.models.js'

const generateAccessRefreshToken=async(userId)=>{
  try {
    const user=  await User.findById(userId);
     const accesstoken= user.generateAccessToken()
      const refreshtoken=user.generateRefreshToken()
   user.refreshToken = refreshtoken
        await user.save({ validateBeforeSave: false })

        return {accesstoken:accesstoken, refreshtoken:refreshtoken}
  } catch (error) {
    throw new ApiError(500,"something went wrong while generating the tokens")
  }
}

const resgisterUser=asynHandler(async(req,res)=>{
   const {username,password,email}= req.body;
   if(
    [username,email,password].some((field)=>
    field?.trim() === "")
){
    throw new ApiError(400,"all fields are required")
}
if(!email.endsWith("@gmail.com")){
  throw new ApiError(400,"invalid email")
}
//  password validation (regex)
const passwordRegex = new RegExp(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=\\[\\]{};\'":\\\\|,.<>\\/?]).{8,}$'
);
if (!passwordRegex.test(password)) {
  throw new ApiError(
    400,
    "Password must be at least 8 characters, and include uppercase, lowercase, digit, and special character."
  );
}
  const existedUser= await User.findOne({
    $or:[{username},{email}]
   })
   if(existedUser){
    throw new ApiError(409,"user with this email or username already exist")
   }
   const user= await User.create({
    username:username.toLowerCase(),
    email,
    password
   })
  await user.save();
   const createdUser=await User.findById(user._id).select(
    "-password -refreshToken"
  )
   if(!createdUser){
    throw new ApiError(500,"something went wrong while registering the user")
   }
    const {accesstoken,refreshtoken}=await generateAccessRefreshToken(user._id)
   const AuthenicatedUser =await User.findById(user._id).select("-password -refreshToken")
const options={
     httpOnly: true,
    sameSite: "None",
     secure: true
}
 return res
    .status(200)
    .cookie("accessToken", accesstoken, options)
    .cookie("refreshToken", refreshtoken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: AuthenicatedUser , accesstoken, refreshtoken
            },
           "User Register Successfully"
        )
    )
})

const loginUser=asynHandler(async(req,res)=>{
    const {identifier,password}=req.body
    if(!identifier){
        throw new ApiError(400,"Username or email is required")
    }
    if(!password){
         throw new ApiError(400,"password is required")
    }
   const user= await User.findOne({
        $or:[{username:identifier},{email:identifier}]
    })
    if(!user){
        throw new ApiError(404,"User with this username or email does not exists")
    }
    const isPasswordMatch= await user.isPasswordMatch(password);
    if(!isPasswordMatch){
        throw new ApiError(401,"invalid password")
    }
    const {accesstoken,refreshtoken}=await generateAccessRefreshToken(user._id)
   const loggedInUser =await User.findById(user._id).select("-password -refreshToken")
const options={
     httpOnly: true,
    sameSite: "None",
     secure: true
}
 return res
    .status(200)
    .cookie("accessToken", accesstoken, options)
    .cookie("refreshToken", refreshtoken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser, accesstoken, refreshtoken
            },
            "User logged In Successfully"
        )
    )
})

const logoutUser =asynHandler(async(req,res)=>{
await User.findByIdAndUpdate(
    req.user._id,
    {
     $unset:{
         refreshToken:1
     }
    },
    {
        new:true
    }
 )
 const options={
    httponly:true,
     sameSite: "None",
    secure:true
 }
 return res
 .status(200)
 .clearCookie("accessToken",options)
 .clearCookie("refreshToken",options)
 .json(new ApiResponse(200,{},"user logged out"))
})


export{resgisterUser,loginUser,logoutUser}
