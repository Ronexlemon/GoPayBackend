const express = require("express");
const router = express.Router();
const User = require("../../models/User")

// const mongoose = require('mongoose');
const {isValidEmail,isValidPhoneNumber} = require("../../hooks/email-phoneNumber");
const { registerUser, loginUser, currentUser } = require("../../controllers/userController");
const validateToken = require("../../middleWare/validateTokenHandler");



router.post('/signup',registerUser)

//login
router.post("/login",loginUser);


//Get all Method
router.get('/current',currentUser)

//Get by ID Method
router.get('/:user_id', async(req, res) => {
    try{
        const data = await User.findById(req.params.user_id);
        res.json(data);
           }catch(error){
               res.status(500).json({message: error.message})
           }
})

//Update by ID Method
router.patch('/:user_id',async (req, res) => {
    try{
        let id = req.params.user_id;
        const upDateData = req.body;
        const options = {new:true};
        const results = await User.findByIdAndUpdate(id,upDateData,options);
        res.send(results);

    }catch(error){
        res.status(400).json({ message: error.message })
    }
})

//Delete by ID Method


module.exports=router;