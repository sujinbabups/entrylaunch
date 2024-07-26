import React, { useEffect, useState } from 'react';

const EmployerviewApplications = () => {
  const [jobIds, setJobIds] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState('');
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // Fetch job IDs for the dropdown
    const fetchJobIds = async () => {
      try {
        const response = await fetch('/api/job-ids');
        if (response.ok) {
          const data = await response.json();
          setJobIds(data);
          console.log('Job IDs:', data);
        } else {
          console.error('Failed to fetch job IDs');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchJobIds();
  }, []);

  useEffect(() => {
    if (selectedJobId) {
      // Fetch applications for the selected job ID
      const fetchApplications = async () => {
        try {
          const response = await fetch(`/api/applications/${selectedJobId}`);
          if (response.ok) {
            const data = await response.json();
            console.log(data);
            setApplications(data);
          } else {
            console.error('Failed to fetch applications');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

      fetchApplications();
    }
  }, [selectedJobId]);

  const handleJobIdChange = (e) => {
    setSelectedJobId(e.target.value);
  };

  const handleActionChange = async (applicationId, action) => {
    try {
      const response = await fetch(`/api/applications/${applicationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action }),
      });

      if (response.ok) {
        window.confirm(`${action} candidate`);
        setApplications((prevApplications) =>
          prevApplications.map((app) =>
            app._id === applicationId ? { ...app, action } : app
          )
        );
      } else {
        console.error('Failed to update application action');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="rounded-2xl bg-gradient-to-r from-green-600 to-blue-400 w-[84%] ml-[2%] mt-[2%] h-[500px] border-2 border-white" id="vwapp">
      <div>
        <h2 className="font-sans text-3xl mt-6 text-white">View Applications</h2>
        <label htmlFor="sel" className="font-sans text-xl font-bold mt-4 text-white">Select job Id :</label>
        <select
          name="jId"
          id="sel"
          className="border p-2 rounded ml-[20px] bg-purple-300"
          onChange={handleJobIdChange}
          value={selectedJobId}
        >
          <option value="" disabled >Select a job ID</option>
          {jobIds.map((jobId) => (
            <option key={jobId} value={jobId} className='text-xl'>
              {jobId}
            </option>
          ))}
        </select>
      </div>

      <table className="min-w-10 mt-4 m-auto">
        <thead>
          <tr className="bg-purple-400">
            <th className="h-12 text-lg font-sans font-bold w-32 sm:w-48 md:w-64 lg:w-80">Name</th>
            <th className="h-12 text-lg font-sans font-bold w-20 sm:w-32 md:w-48 lg:w-64">Email</th>
            <th className="h-12 text-lg font-sans font-bold w-24 sm:w-32 md:w-40 lg:w-48">Course</th>
            <th className="h-12 text-lg font-sans font-bold w-32 sm:w-56 md:w-72 lg:w-48">Place</th>
            <th className="h-12 text-lg font-sans font-bold w-24 sm:w-56 md:w-72 lg:w-80">Skills</th>
            <th className="h-12 text-lg font-sans font-bold w-24 sm:w-56 md:w-40 lg:w-80">Action</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application) => (
            <tr key={application._id}>
              <td className="font-bold border-2 border-blue-800 text-center bg-gray-200 h-10">{application.can_name}</td>
              <td className="font-bold border-2 border-blue-800 text-center bg-gray-200 h-10">{application.email}</td>
              <td className="font-bold border-2 border-blue-800 text-center bg-gray-200 h-10">{application.course}</td>
              <td className="font-bold border-2 border-blue-800 text-center bg-gray-200 h-10">{application.place}</td>
              <td className="font-bold border-2 border-blue-800 text-center bg-gray-200 h-10">{application.skills}</td>
              <td className="font-bold border-2 border-blue-800 text-center bg-gray-200 h-10">
                <button
                  className={`p-1 rounded ${application.action === 'selected' ? 'bg-purple-600 text-white cursor-not-allowed' : 'bg-green-500 text-white'}`}
                  onClick={() => handleActionChange(application._id, 'selected')}
                  disabled={application.action === 'selected'}
                >
                  {application.action === 'selected' ? 'Selected' : 'Select'}
                </button>
                <button
                  className="bg-red-500 text-white p-1 rounded ml-2"
                  onClick={() => handleActionChange(application._id, 'rejected')}
                >
                   {application.action === 'selected' ? 'Reject' : ''}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployerviewApplications;
