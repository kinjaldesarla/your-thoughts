import { Dairy } from "../models/dairy.models.js";
import { ApiError } from "../utils/apierror.js";
import { ApiResponse } from "../utils/apiResponse.js";
import asynHandler from "../utils/aysnhandler.js";

const getAllDairy=asynHandler(async(req,res)=>{
     const userId=req.user._id;
    const dairys= await Dairy.find({userId}).sort({ createdAt: -1 });
    if(!dairys){
        throw new ApiError(500,"something went wrong while loading dairys")
    }
    const formattedDairy= dairys.map(d => ({
  _id: d._id,
  dairyName: d.dairyName,
  date: d.date.toLocaleDateString('en-IN'),
  userId:d.userId,
  createdAt: d.createdAt,
  updatedAt: d.updatedAt
}));
    return res
    .status(200)
    .json(new ApiResponse(200,formattedDairy,"dairys fetched successfully"))
})

const createDairy=asynHandler(async(req,res)=>{
      const userId=req.user._id;
    const {dairyName}=req.body;
    if(!dairyName){
        throw new ApiError(400,"Diary's name required")
    }
    const dairy =await Dairy.create({
        dairyName,
        userId
    });
    if(!dairy){
        throw new ApiError(500,"somethind went wrong while creating dairy")
    }
    
const formattedDairy = {
  _id: dairy._id,
  dairyName: dairy.dairyName,
  date: dairy.date.toLocaleDateString('en-IN'),
  userId:dairy.userId,
  createdAt: dairy.createdAt,
  updatedAt: dairy.updatedAt
};
    return res
    .status(200)
    .json(new ApiResponse(200,formattedDairy,"diary created successfully"))
})

const deleteDairy=asynHandler(async(req,res)=>{
    const dairyId=req.params.dairyId
    if(!dairyId){
    throw new ApiError(400,"dairy id is require")
    }
  const deletedDairy=  await Dairy.findByIdAndDelete(dairyId);
  if(!deletedDairy){
      throw new ApiError(404,"dairy not found")
  }
  return res
  .status(200)
  .json(new ApiResponse(200,{},"dairy deleted successfully"))
})


export{getAllDairy,createDairy,deleteDairy}