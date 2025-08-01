import dotenv from 'dotenv'
dotenv.config({
  path:'./.env'
})

import connectDB from './db/db.js'
import app from './app.js'

console.log(process.env.CORS_ORIGIN);

connectDB()
.then(()=>{
  app.on("connected",()=>{
    console.log("connected ");
  })
  app.on("disconnected",()=>{
     console.log("disconnected ");
  })
  app.on("error",(error)=>{
    console.log(error);
    throw error;
  })
  app.listen(process.env.PORT||3000,()=>{
    console.log(`sever is running at port ${process.env.PORT}`);
    
  })
})
.catch((error)=>{
  console.log(("MONGODB connection failed ",error));
})