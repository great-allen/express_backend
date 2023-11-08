import Users from '../database/Schemas/UserSchema'
import { hashPassword } from '../utils/helper'
import express from 'express';

export const userRegister=async (req:express.Request,res:express.Response)=>{
    const { email,username,password } = req.body;
    const userDB = await Users.findOne({ email });
    if (userDB) {
      res.status(400);
      res.send({ msg: 'User already exists!' });
    } else {
      const password =await  hashPassword(req.body.password);
      console.log(password);
      const newUser = await Users.create({ username,email,password });
      res.status(201)
    }
}