import passport from "passport";
import mongoose from "mongoose";
import { Strategy } from "passport-local";
import { checkUser } from "../utils/helper";
import Users from "../database/Schemas/UserSchema";


passport.serializeUser((user:any, done) => {
    console.log('Serializing User...');
    console.log(user);
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id:string, done) => {
    console.log('Deserializing User');
    console.log(id);
    try {
       
        const user = await Users.findById(id);
    //   const user = await Users.findById(id);
      if (!user) throw new Error('User not found');
      console.log(user);
      done(null, user); // Provide both error (null) and user
    } catch (err) {
      console.log(err);
      done(err, null); // Provide both error and null for the user
    }
  });

  passport.use(
    new Strategy(
      {
        usernameField: 'email',
      },
      async (email, password, done) => {
        console.log(email);
        console.log(password);
        try {
          if (!email || !password) throw new Error('Missing Credentials');
          const userDB = await Users.findOne({ email }).select('+password');
          if (!userDB) throw new Error('User not found');
          const isValid = await checkUser(password, userDB.password);
          if (isValid) {
            console.log('Authenticated Successfully!');
            done(null, userDB);
          } else {
            console.log('Invalid Authentication');
            done(null, false);
          }
        } catch (err) {
          console.log(err);
          done(err, false);
        }
      }
    )
  );