import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EmployerAddjob = ({company}) => {
    const [job_id, setJobid] = useState("");
    const [job_name, setJobname] = useState("");
    const [location, setLocation] = useState("");
    const [skills, setSkills] = useState("");
    const [date, setDate] = useState("");

    const navigate=useNavigate();

    const signupSubmit = async (jobDetails) => {
        const res = await fetch("api/add-job", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jobDetails),
        });
        // return;
        console.log(res);
        if (res.ok) {
          toast.success("Added new Job")
          // return navigate("/login");
        } else {
          toast.error(`Please check the input data`);
        //   return navigate("/signup");
        }
      };
      const submitForm = (e) => {
        e.preventDefault();
        const jobDetails = {
            job_id,
            job_name,
            location,
            skills,
            date,
            postedBy:company.email,
          
        
        };
       
    
        signupSubmit(jobDetails);
      };
  
  return (
   <>
   <div className=" w-[77%] h-[500px] mt-[2%] ml-[2%] rounded-2xl bg-gradient-to-r from-green-600 to-blue-400 border-2 border-white"
            id="adjob">
            <h2 className="font-sans text-3xl mt-6 font-bold text-white ">Hy <span className='text-purple-800  '>{company.co_name} </span></h2>
            <h2 className="font-sans text-2xl mt-4 font-bold text-purple-800 ">Add a Job</h2>
            <form onSubmit={submitForm}>
            <table className="bg-purple-400 min-w-full mb-4 shadow-md rounded-lg text-xl font-bold">
                <thead>
                    <tr>

                        <th className="px-4 py-2 border">Job Id</th>
                        <th className="px-4 py-2 border">Job name</th>
                        <th className="px-4 py-2 border">Location</th>
                        <th className="px-4 py-2 border">Skills</th>
                        <th className="px-4 py-2 border">Last date</th>
                        <th className="px-4 py-2 border"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr id="addjob">

                        <td><input type="text" name="job_id" id="job_id" value={job_id} onChange={(e) => setJobid(e.target.value)} className="border p-2 rounded w-full"/></td>
                        <td><input type="text" name="job_name" id="job_name" value={job_name} onChange={(e) => setJobname(e.target.value)} className="border p-2 rounded w-full"/></td>
                        <td><input type="text" name="location" id="location" value={location} onChange={(e) => setLocation(e.target.value)} className="border p-2 rounded w-full"/></td>
                        <td><input type="text" name="skills" id="skills" value={skills} onChange={(e) => setSkills(e.target.value)} className="border p-2 rounded w-full"/></td>
                        <td><input type="date" name="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} className="border p-2 rounded w-full"/>
                        </td>
                        <td><input type="submit" value="Post Job" 
                                className="bg-purple-900 text-white py-2 px-4 rounded cursor-pointer ml-2"/></td>
                    </tr>
                </tbody>
            </table>
            </form>
        </div>
   
   </>
  )
}

export default EmployerAddjob
