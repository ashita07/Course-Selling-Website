const {Router} = require("express");
const adminMiddleware = require("../middleware/admin")
const router = Router();
const {Admin}=require("../db")
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config");
const {Course} = require("../db")


router.post('/signup',async(req,res)=>{
const username = req.body.username;
const password = req.body.password;

await Admin.create({
username,
password 
})
res.json({
    message:"Admin created"
})
});

router.post('/signin',async(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    const user = await Admin.findOne({
        username: username,
        password: password
    })
    if(user){
  const token=   jwt.sign({
        username
    },jwt_secret)
    res.json({
        token
    })
}else{
    res.status(411).json({
        message:"incorrect email and password"
    })
}
})

router.post('/courses',adminMiddleware,async (req,res)=>
{
  const title = req.body.title;
    const description = req.body.description;
      const imageLink = req.body.imageLink;
        const price = req.body.price;

      const newCourse=   await Course.create({
            title,
            description,
            imageLink,
            price
        })
        res.send({
            msg:"course created",
            courseId: newCourse._id
        })
})

router.get('/courses',adminMiddleware,async (req,res)=>{
  const courses = await Course.find({  
  })
  res.json({
    courses : courses
  })
})

module.exports = router;