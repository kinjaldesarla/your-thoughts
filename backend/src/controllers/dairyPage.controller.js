import { DairyPage } from '../models/dairyPage.models.js'
import { ApiError } from '../utils/apierror.js';
import { ApiResponse } from '../utils/apiResponse.js';
import asynhandler from '../utils/aysnhandler.js'

const getAllDairyPages=asynhandler(async(req,res)=>{
         const userId=req.user._id;
         const {dairyId}=req.params
         if(!dairyId){
            throw new ApiError(400,"dairyId is reuired")
         }
    const dairyPages= await DairyPage.find({
        $and:[{userId} ,{dairyId}]
    }).sort({ createdAt: -1 });
    if(!dairyPages){
        throw new ApiError(500,"something went wrong while loading pages of dairy")
    }
    const formattedDairyPage=dairyPages.map((dairyPage)=>({
       _id: dairyPage._id,
  content:dairyPage.content,
  date: dairyPage.date.toLocaleDateString('en-IN'),
  userId:dairyPage.userId,
    dairyId:dairyPage.dairyId,
  createdAt: dairyPage.createdAt,
  updatedAt: dairyPage.updatedAt
    }))
    return res
    .status(200)
    .json(new ApiResponse(200,formattedDairyPage,"pages fetched successfully"))
})

const createDairyPage=asynhandler(async(req,res)=>{
    const userId=req.user._id
    const {dairyId}=req.params
     if(!req.params){
            throw new ApiError(400,"dairyId is reuired")
         }
    const{content}=req.body;
   if(!content){
    throw new ApiResponse(400,"content of page must required")
   }
   const dairyPage=await DairyPage.create(
    {
        content,
        userId,
        dairyId
    }
   )
   if(!dairyPage){
    throw new ApiError(500,"something went wrong while creating page")
   }
 const formattedDairyPage = {
  _id: dairyPage._id,
  content:dairyPage.content,
  date: dairyPage.date.toLocaleDateString('en-IN'),
  userId:dairyPage.userId,
  dairyId:dairyPage.dairyId,
  createdAt: dairyPage.createdAt,
  updatedAt: dairyPage.updatedAt
};
   return res
   .status(200)
   .json(new ApiResponse(200,formattedDairyPage,"page created successfully"))
})

const deleteDairyPage=asynhandler(async(req,res)=>{
    const pageId=req.params.pageId;
    if(!pageId){
    throw new ApiError(400,"page id is require")
    }
    const deletedPage= await DairyPage.findByIdAndDelete(pageId);
    if(!deletedPage){
        throw new ApiError(404,"page not found")
    }
    return res
    .status(200)
    .json(new ApiResponse(200,{},"page deleted successfully"))
})

const updateDairyPage=asynhandler(async(req,res)=>{
     const pageId=req.params.pageId;
    if(!pageId){
    throw new ApiError(400,"page id is require")
    }
    const {content}=req.body
    if( !content){
        throw new ApiError(400,"content is required in oder to update the page")
    }
    const page=await DairyPage.findById(pageId);
    if(!page){
        throw new ApiError(404,"page not found")
    }
    if(content) page.content=content;
    await page.save({validateBeforeSave:false});
    return res
    .status(200)
    .json(new ApiResponse(200,page,"page updated successfully"))
})

export{getAllDairyPages,createDairyPage,deleteDairyPage,updateDairyPage}