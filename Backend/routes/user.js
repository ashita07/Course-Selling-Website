const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User} = require("../db/index")
const {Course} = require("../db/index")
const mongoose =require("mongoose")

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
     const username = req.body.username;
     const password = req.body.password;
     User.create({
        username,
        password
     }).then(function(){
     res.json({
        message:"User created successfully"
     })}).catch(function(){
        res.json({
            msg:"an error occured"
        })
     })
});

router.get('/courses',async (req, res) => {
    // Implement listing all courses logic
    const response =await Course.find({});

    res.json({
        courses:response
    })
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const courseId = req.params.courseId;
  console.log(courseId);
  const username = req.headers.username;

  await User.updateOne(
    {
      username: username,
    },
    {
      $push: {
        purchasedCourses: courseId,
      },
    }
  );
  res.json({
    message: "Purchase complete!",
  });
});



router.get('/purchasedCourses', userMiddleware,async  (req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({
        username: req.headers.username
    })
    const courses = await Course.find({
        _id:{
            "$in": user.purchasedCourses
        }
    })
    res.json({
        courses: courses
    })


});

module.exports = router