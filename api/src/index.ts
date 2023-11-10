import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import connectDB from './database/connection'
import userRoutes from './routes/user'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import passport from 'passport'
import './strategies/local'


if (typeof process.env.MY_SECRET !== "string") {
  throw new Error("MY_SECRET is not defined");
}
declare namespace NodeJS {
  interface ProcessEnv {
    MY_SECRET: string;
  }
}
const app=express()
const mySecret=process.env.MY_SECRET


app.use(session({
 secret: mySecret,
 saveUninitialized:false,
 resave:false,
 store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/backend_test' })
 // cookie:{
 //     maxAge:6000
 // }
}))

app.use(cors({
    credentials:true
}))
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(compression())
app.use(bodyParser.json())
app.use(passport.initialize());
app.use(passport.session());

const port=3000

connectDB().then(() => {

 
    app.listen(port, () => {
      console.log(`Server started on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to the database:', error);
  });
 

//   const checkLogin=(req:express.Request,res:express.Response,next:express.NextFunction)=>{
//     console.log("groceries");
//     if(req.user){
//         next()
//     }
//     else {
//         res.send(401)
//     }
// }

  app.use('/users',userRoutes)




