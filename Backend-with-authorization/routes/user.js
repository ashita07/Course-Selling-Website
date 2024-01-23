const { Router } = require("express");
const userMiddleware = require("../middleware/user");
const router = Router();
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config");
const { Course } = require("../db");

router.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  await User.create({
    username,
    password,
  });
  res.json({
    message: "User created",
  });
});

router.post("/signin",async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const userExists =await User.findOne({
    username,
    password,
  });
  if (userExists) {
    const token = jwt.sign({ username }, jwt_secret);
    res.json({
      token,
    });
  } else {
    res.json({  message: "user does not exist"})
  
  }
});

router.get("/courses",async (req, res) => {
const courses=await Course.find({})
res.json({
    courses:courses
})

});

router.post("/courses/:courseId", userMiddleware,async  (req, res) => {
   const username = req.username;
   const courseId = req.params.courseId;
   await User.updateOne({
    username:username
   },{
    "$push":{
        purchasedCourses :courseId
    }
   })
   res.json({
    message:"purchase complete"
   })
});

router.get("/purchasedCourses", userMiddleware, async(req, res) => {
    const user =req.username;
    const courses = await Course.find({
        _id:{
           " $in" : user.purchasedCourses
        }
    })
    req.json({
        courses: courses
    })
});

module.exports = router;
