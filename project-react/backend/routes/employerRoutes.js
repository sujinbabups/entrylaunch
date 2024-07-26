const express = require("express");
const router = express.Router();
const employerCollection = require("../models/employer");
const jobSchema = require("../models/joblist");
const joblist=require('../models/joblist')
const authenticateToken=require('../middleware/tokenAuth')
const applyJob=require('../models/appliedjobs')

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



router.post('/employer-login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const employer = await employerCollection.findOne({ email });
  
      if (!employer) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }
  
      const isMatch = await bcrypt.compare(password, employer.password);

      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      const token = jwt.sign(
        { empId: employer._id, email: employer.email },
        "your-secret-key",
        {
          expiresIn: "1h",
        }
      );
  
      // Set the token in a cookie
      res.cookie('AuthToken', token, { httpOnly: true, secure: false });
      res.status(200).json({ message: 'Login Success', token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  router.post('/emplogout', (req, res) => {
    res.clearCookie('AuthToken', { httpOnly: true, secure: false });
    res.status(200).json({ message: 'Logout Success' });
  });
  

// Adding a job by employer

router.post('/add-job', authenticateToken,async (req, res) => {
    try {
        const { job_id, job_name, location, skills, date,postedBy } = req.body;

        // console.log(job_id);
        const new_job = new jobSchema({
            job_id,
            job_name,
            location,
            skills,
            date,
            postedBy,
        });

        await new_job.save();
        res.status(201).json({ message: "Added new job" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// Getting the employers details to home page

router.get('/recruiters', async (req, res) => {
  try {
    const recruiters = await employerCollection.find();
    res.json(recruiters);
  } catch (error) {
    console.error('Error fetching recruiters:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/get-employer', authenticateToken, async (req, res) => {
    try {
      const employer = await employerCollection.findById(req.user.empId);
      if (!employer) {
        return res.sendStatus(404);
      }
      res.json(employer);
    } catch (error) {
      console.error('Error fetching employer details:', error);
      res.status(500).json({ error: "Failed to fetch user details" });
    }
  });

  // Getting the added jobs to the employer dash 

  router.get('/job-details', authenticateToken, async (req, res) => {
    try {
      const empmail = req.user.email;
  
      // Fetch the jobs posted by the logged-in employer
      const jobs = await jobSchema.find({ postedBy: empmail });
  
      if (!jobs.length) {
        return res.status(404).json({ message: 'No jobs found for this employer' });
      }
  
      res.status(200).json(jobs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  // Update job details
  router.put('/update-job', authenticateToken, async (req, res) => {
    const { job_id, job_name, location, skills, date } = req.body;
  
    try {
      const job = await jobSchema.findOneAndUpdate(
        { job_id },
        { job_name, location, skills, date },
        { new: true }
      );
  
      if (!job) {
        return res.status(404).json({ message: 'Job not found' });
      }
  
      res.status(200).json(job);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  // getting the job id to the employer
  router.get('/job-ids', authenticateToken, async (req, res) => {
    try {
      const empEmail = req.user.email;
      console.log(empEmail);
      const jobs = await joblist.find({postedBy:empEmail }); // Adjust field name as necessary
      console.log(jobs);
      const jobIds = jobs.map(job => job.job_id);
      res.status(200).json(jobIds);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  // get the candidate details

  router.get('/applications/:jobId', authenticateToken, async (req, res) => {
    try {
      const jobId = req.params.jobId;
      const applications = await applyJob.find({ job_id: jobId }); // Adjust field name as necessary
      res.status(200).json(applications);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  // select or reject the application

  router.put('/applications/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { action } = req.body;
  
    try {
      const application = await applyJob.findByIdAndUpdate(id, { action }, { new: true });
  
      if (!application) {
        return res.status(404).json({ message: 'Application not found' });
      }
  
      res.status(200).json(application);
    } catch (error) {
      console.error('Error updating application action:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });



module.exports = router;

