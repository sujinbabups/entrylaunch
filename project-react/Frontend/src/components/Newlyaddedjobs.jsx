import React, { useEffect, useState, useRef } from 'react';
import '../App.css'; 


const NewlyAddedJobs = () => {
  const [jobs, setJobs] = useState([]);

  const [showMessage, setShowMessage] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {

    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/get-jobsss'); 
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
  }, []);

  const handleApplyClick = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 3000); // Message will disappear after 3 seconds
  };

  return (
    <div className="relative h-[330px] w-[30%] max-w-3xl p-4 bg-gradient-to-t from-gray-400 to-gray-700 rounded-2xl m-auto mt-[-860px]">
      <h3 className="text-3xl font-bold font-serif text-center animated-gradient-text">
        Newly Added Jobs
      </h3>
      <div className="relative h-[250px] w-full bg-gradient-to-t from-blue-700 to-gray-600 mx-auto rounded-lg overflow-hidden">
        <div ref={containerRef} className="scroll-container flex space-x-4 p-4">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-96 h-[200px] flex flex-col justify-center items-center text-white text-center p-4 border-2 border-blue-800 rounded-lg bg-gradient-to-r from-green-400 to-blue-500"
            >
              <h4 className="text-xl font-bold">A {job.job_name} vacancy</h4>
              <h2 className='font-bold'>at {job.location}</h2>
              <h2 className='font-bold'>Apply before <span className='text-green-900'>{job.date}</span></h2>
              <input
                type="button"
                value="Apply"
                className="h-10 w-28 bg-purple-500 rounded-xl hover:bg-purple-700 cursor-pointer"
                onClick={handleApplyClick}
              />
            </div>
          ))}
        </div>
      </div>
      {showMessage && (
        <div className="message-animation">
          Please login to apply
          
        </div>
        )}
    </div>
  );
};

export default NewlyAddedJobs;
