import express from 'express'
import Users from '../database/Schemas/UserSchema'
import { Router } from 'express'
import passport from 'passport';
import { userRegister } from '../controllers/userController';
const userRoutes = express.Router();

userRoutes.get('/', async (req, res) => {
  try {
      const users= await Users.find()
      res.status(200).json(users)
  } catch (error) {
    console.log(error);
    res.status(500).json({error:'internal error'})
    
  }
});
userRoutes.post('/register',userRegister)
// userRoutes.post('/', async (req, res) => {
//   const isValid = true;
//   if (isValid) {
//     const newUser = new Users({
//       email: req.body.email,
//       username: req.body.username,
//       password: req.body.password,
//     });

//     try {
//       const savedUser = await newUser.save();
//       res.send(savedUser)
//     } catch (error) {
//       console.error(error);
//     }
//   } else {
//     console.log("Error");
//     res.render('users/new', {
//       email: req.body.email,
//       username: req.body.username,
//       password: req.body.password,
//     });
//   }
// });
userRoutes.post('/login',passport.authenticate('local'),(req,res)=>{

  console.log("logged in");
  res.sendStatus(200)
})

userRoutes.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
      res.sendStatus(500); // Handle errors
    } else {
      req.session.destroy((err) => {
        if (err) {
          console.error(err);
          res.sendStatus(500); // Handle errors
        } else {
          res.clearCookie('connect.sid'); // Clear the session cookie
          res.sendStatus(200); // Send a successful response
        }
      });
    }
  });
});

export default userRoutes;
