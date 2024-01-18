// const asyncHandler = (handler) => (req, res, next) =>
//   Promise.resolve(handler(req, res, next)).catch(next);
const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// Import the User model and isValidPhoneNumber function
const User = require("../models/User");
const {isValidPhoneNumber} = require('../hooks/email-phoneNumber');

// Register a user
const registerUser = asyncHandler(async (req, res) => {
  const { password, publicKey, phoneNumber, privateKey } = req.body;

  if (isValidPhoneNumber(phoneNumber)) {
    const user = await User.findOne({phoneNumber});
    if(user){
        return res.json("user already exists")
    }
    const hashPassword = await bcrypt.hash(password,5);
    const data = new User({
      password: hashPassword,
      privateKey: privateKey,
      publicKey: publicKey,
      phoneNumber: phoneNumber,
    });

    try {
      const dataToSave = await data.save();
      console.log('Saved data:', dataToSave);
      res.status(200).json("Register successfully");
    } catch (error) {
      console.log('Save error:', error);
      res.status(400).json({ message: error.message });
    }
  } else {
    res.status(400).json("Confirm your phone number");
  }
});

//login
const loginUser= asyncHandler(async (req, res) => {
    const { password, phoneNumber } = req.body;

    if (isValidPhoneNumber(phoneNumber)) {
        try {
            const user = await User.findOne({ phoneNumber });

            if (!user) {
                return res.status(400).json("Confirm Your details");
            }

            // Add  password validation logic here
                     if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              password,
              user.password
            )
        if(isPasswordCorrect){
           
            res.status(200).json(user);
            
        }else{
            res.status(400).json("Confirm your credentials");
        }};

            // If password is valid, send success response
            
        } catch (error) {
            console.error("Error during login:", error);
            res.status(500).json("Internal Server Error");
        }
    } else {
        res.status(400).json("Confirm your phone number");
    }})

    //current user
    //@private access
    const currentUser= asyncHandler(async (req, res) => {
        try{
     const data = await User.find().exec()
     .then(user =>{
        res.json(user);
    
     });
     
        }catch(error){
            res.status(500).json({message: error.message})
        }
       
    })
module.exports = { registerUser,loginUser,currentUser };
