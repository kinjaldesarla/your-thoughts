import mongoose, { mongo } from "mongoose";

const dairySchema= new mongoose.Schema({
    dairyName:{
        type:String,
        required:true
    },
    date: {
    type: Date,
    default: Date.now
  },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  }
},{timestamps:true})

export const Dairy = mongoose.model("Dairy",dairySchema)