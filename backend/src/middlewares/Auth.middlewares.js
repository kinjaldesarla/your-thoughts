import jwt  from "jsonwebtoken"
import asynHandler from "../utils/aysnhandler.js"
import { ApiError } from "../utils/apierror.js"
import { User } from "../models/user.models.js"
export const verifyjwt= asynHandler(async(req,_,next)=>{
try {
      const token =req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
      console.log(req.cookies);
      
      if(!token){
        throw new ApiError(401,"Unauthorized request")
      }
      const decodedToken=  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
      const user=await User.findById(decodedToken._id)
      if(!user){
        throw new ApiError(401,"invalid access token")
      }
      req.user=user;
      next();
} catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token")
}
})
