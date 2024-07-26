import React, { useEffect, useState } from 'react';

const CandidateApplications = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [jobList, setJobList] = useState([]);

  useEffect(() => {
    // Fetch applied jobs data from the backend
    const fetchAppliedJobs = async () => {
      try {
        const response = await fetch('/api/app-details'); // Ensure the endpoint is correct
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

    // Fetch job list data from the backend
    const fetchJobList = async () => {
      try {
        const response = await fetch('/api/get-jobs'); // Ensure the endpoint is correct
        if (response.ok) {
          const data = await response.json();
          setJobList(data);
        } else {
          console.error('Failed to fetch job list');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchAppliedJobs();
    fetchJobList();
  }, []);

  return (
    <>
      <div
        className="myappl bg-gradient-to-r from-blue-300 to-blue-700 text-white p-8 rounded-lg relative top-[5%] ml-8 h-[540px] w-[65%]"
        id="appli"
      >
        <h3 className="text-3xl font-bold mb-6">Your Applications</h3>
        <table className="w-[80%] text-black mx-auto relative top-[10%] ">
          <thead>
            <tr className="bg-gradient-to-r from-green-500 to-blue-800 border-blue-800 text-center text-white h-10">
              <th className="w-[25%]">Job</th>
              <th>Location</th>
              <th>Skills</th>
              <th>Last date</th>
              <th>Application Status</th>
            </tr>
          </thead>
          <tbody>
            {appliedJobs.map((job) => {job.action==='selected'?'text-green-600':'text-red-600'
              const jobDetail = jobList.find((list) => list.job_id === job.job_id);
              return (
                jobDetail && (
                  <tr key={job.job_id} className='bg-gradient-to-r from-green-500 to-blue-800' >
                    <td className="font-bold bg-gray-300 border-2 border-blue-800 text-center h-10">{job.job}</td>
                    <td className="font-bold bg-gray-300 border-2 border-blue-800 text-center h-10">{jobDetail.location}</td>
                    <td className="font-bold bg-gray-300 border-2 border-blue-800 text-center h-10">{jobDetail.skills}</td>
                    <td className="font-bold bg-gray-300 border-2 border-blue-800 text-center h-10">{jobDetail.date}</td>
                    <td
                      className={`font-bold bg-gray-300 border-2 border-blue-800 text-center h-10 ${
                        job.action === 'selected' ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {job.action}
                    </td>
                  </tr>
                )
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CandidateApplications;
