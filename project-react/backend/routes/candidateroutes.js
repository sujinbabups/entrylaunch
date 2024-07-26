const express = require("express");
const router = express.Router();
const jobslist = require("../models/joblist");
const applyJob = require('../models/appliedjobs');
const Candidate_Reg = require('../models/candidate')
const authenticateToken = require('../middleware/tokenAuth')
// const veryfyTocken=require('../middleware/authMiddleware')

// router.get("/candidate",veryfyTocken, async (req, res) => {
//     const details = await jobs.find({});
//     res.json(details);
//   });

// Getting the jobs to the candidate profile

router.get('/get-jobs',authenticateToken, async (req, res) => {
  try {
    const jobs = await jobslist.find();
    res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// getting jobs to home page 

router.get('/get-jobsss', async (req, res) => {
  try {
    const jobs = await jobslist.find();
    res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Getting the applied jobs to candidate dashboard

router.get('/app-details', authenticateToken, async (req, res) => {
  try {
    // Ensure you have the user email in the request object
    const email = req.user.userEmail;
    // console.log(email);

    // Fetch jobs that match the logged-in user's email
    const jobs = await applyJob.find({ email: email });

    res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/job-details', authenticateToken, async (req, res) => {
  try {
    // Ensure you have the user email in the request object
    const email = req.user.userEmail;
    console.log(email);

    // Fetch jobs that match the logged-in user's email
    const jobs = await jobslist.find({ postedBy: email });
    console.log(jobs)

    res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});



// Apply job 
router.post('/apply-job', authenticateToken,async (req, res) => {
  try {
    const newApplication = new applyJob({
      job_id: req.body.job_id,
      job: req.body.job,
      can_name: req.body.can_name,
      email: req.body.email,
      course: req.body.course,
      skills: req.body.skills,
      place: req.body.place,

      postedBy: req.body.postedBy,
      action: 'pending'
    });

    await newApplication.save();
    res.status(201).json({ message: 'Job application submitted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
// Updating the user profile


router.put('/update-user',authenticateToken, async (req, res) => {
  try {
    const { email, dob, course, passingyr, grade, skills, place } = req.body;

    // Find the user by ID and update their details
    const user = await Candidate_Reg.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.dob = dob;
    user.course = course;
    user.passingyr = passingyr;
    user.grade = grade;
    user.skills = skills;
    user.place = place

    await user.save();
    res.status(200).json({ message: "User details updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});



// getting the user details

router.get('/get-user', authenticateToken, async (req, res) => {
  try {
    const user = await Candidate_Reg.findById(req.user.userId);
    if (!user) return res.sendStatus(404);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user details" });
  }
});
module.exports = router;