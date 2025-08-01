import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors'
const app=express();

app.use(cors({
    origin:'https://your-thoughts-frontend.vercel.app',
    credentials:true
}))



app.use(express.json({limit:'16kb'}))
app.use(express.urlencoded({limit:'16kb',extended:true}))
app.use(cookieParser())


import userRouter from './routes/user.routes.js'
import dairyRouter from './routes/dairy.routes.js'
import dairyPageRouter from './routes/dairyPage.routes.js'
app.use("/api/v1/users",userRouter)
app.use("/api/v1/dairy",dairyRouter)
app.use("/api/v1/dairy/dairy-page",dairyPageRouter)

export default app;