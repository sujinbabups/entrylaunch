import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import '../Candidtestyle.css'

const CandidteHome = () => {
  const [jobs, setJobs] = useState([]);
  const [user, setUser] = useState({});
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    // Fetch jobs data from the backend
    const fetchJobs = async () => {
      try {
        const response = await fetch('api/get-jobs');
        if (response.ok) {
          const data = await response.json();
          setJobs(data);
        } else {
          console.error('Failed to fetch jobs');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchJobs();

    // Fetch user data from the backend
    const fetchUser = async () => {
      try {
        const response = await fetch('api/get-user', {
          method: 'GET',
          credentials: 'include', // Include credentials in the request
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUser();

    // Fetch applied jobs data from the backend
    const fetchAppliedJobs = async () => {
      try {
        const response = await fetch('/api/app-details');
        if (response.ok) {
          const data = await response.json();
          setAppliedJobs(data);
        } else {
          console.error('Failed to fetch applied jobs');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchAppliedJobs();
  }, []);

  const signupSubmit = async (jobDetails) => {
    const res = await fetch('api/apply-job', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jobDetails),
    });

    if (res.ok) {
      toast.success('Applied for the job');
      setAppliedJobs((prevAppliedJobs) => [...prevAppliedJobs, jobDetails.job_id]);
    } else {
      toast.error('Cannot apply');
    }
  };

  const handleApply = (job) => {
    if (window.confirm('Do you want to apply for this job?')) {
      const jobDetails = {
        job_id: job.job_id,
        job: job.job_name,
        can_name: user.fname,
        email: user.email,
        course: user.course,
        skills: user.skills,
        place: user.place,
        description: job.description,
        postedBy: job.postedBy,
      };

      signupSubmit(jobDetails);
    }
  };

  return (
    <div className="canHome bg-gradient-to-r from-blue-300 to-blue-700 text-white p-8 rounded-lg relative top-[5%] ml-8 w-[65%] h-[540px] overflow-hidden shadow-lg transform transition-all duration-500 ease-in-out">
      <h2 className="text-3xl font-bold mb-6  hi-animation">
        Hi <span className="text-blue-800 text-4xl">{user.fname}</span>
      </h2>
      <div className="job-card-container overflow-scroll">
        {jobs.map((job) => {
          const isApplied = appliedJobs.find(application => application.job_id === job.job_id);
          return (
            <div key={job.job_id} className="job-card p-4 m-2 w-[65%] rounded-lg shadow-md text-white  bg-gradient-to-r from-green-500 to-blue-800 border-2" >
              <h3 className="text-xl font-bold mb-2">{job.job_name}</h3>
              <hr />
              <p><strong>ID:</strong> {job.job_id}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Skills:</strong> {job.skills}</p>
              <p><strong>Last Date:</strong> {job.date}</p>
              <div className="mt-4">
                {isApplied ? (
                  <button
                    className={`p-2 rounded ${isApplied.action === 'selected' || isApplied.action === 'pending' ? 'bg-green-600 text-white cursor-not-allowed' : 'bg-green-600 text-white cursor-not-allowed'}`}
                    disabled={isApplied.action === 'selected' || isApplied.action === 'pending'}
                  >
                    {isApplied.action === 'selected' || isApplied.action === 'pending' ? 'Applied' : 'Applied'}
                  </button>
                ) : (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transform transition-all duration-300 ease-in-out hover:scale-105"
                    onClick={() => handleApply(job)}
                  >
                    Apply
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CandidteHome;
