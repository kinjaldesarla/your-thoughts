import mongoose from "mongoose";

const dairyPageSchema=new mongoose.Schema({
    content:{
         type:String,
    }, 
      date: {
    type: Date,
    default: Date.now
  },
   userId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true
    },
    dairyId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Dairy",
      required:true
    }
},{timestamps:true})

export const DairyPage=mongoose.model("DairyPage",dairyPageSchema)