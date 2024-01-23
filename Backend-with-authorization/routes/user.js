const {Router} = require("express");
const adminMiddleware = require("../middleware/admin")
const router = Router();
const {User}=require("../db")
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config");
const {Course} = require("../db")

router.post('/signup',async (req,res)=>{
    const username = req.body.username;
const password = req.body.password;

await User.create({
username,
password 
})
res.json({
    message:"User created"
})
})

router.post("/signin", (req, res) => {

});

router.get('/courses',(req,res)=>{

})

router.get('/courses',(req,res) =>{

})

router.post('/courses/:courseId',userMiddleware,(req,res)=>{

})

router.post("/purchasedCourses", userMiddleware, (req, res) => {});

module.exports = router