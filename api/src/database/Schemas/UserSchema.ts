import mongoose from "mongoose";
import { Schema } from "mongoose";
import { Document } from "mongoose";

interface IUser extends Document {
    // _id: mongoose.Types.ObjectId; // Use mongoose.Types.ObjectId for _id
    email: string;
    username: string;
    password: string;
  }
  

const UserSchema=new Schema<IUser>({
    email:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        select:false
    }
})

const Users=mongoose.model<IUser>('Users',UserSchema)
export default Users