import React, { useEffect, useState } from 'react'
import EmployerAddjob from './EmployerAddjob';
import EmployerviewApplications from './EmployerviewApplications';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import EmployerviewJobs from './EmployerviewJobs';

const Employermaindiv = () => {
    const [activeComponent, setActiveComponent] = useState('addjob');
    const [employer, setEmployer] = useState({});

    const navigate=useNavigate();
    const handelAddjob = (event) => {
        event.preventDefault();
        setActiveComponent('addjob');
      };

      const viewJobs = (event) => {
        event.preventDefault();
        setActiveComponent('viewjob');
      };

      const handleApplication = (event) => {
        event.preventDefault();
        setActiveComponent('viewapplications');
      };

      const logout = async () => {
        try {
          const res = await fetch('/api/emplogout', { method: 'POST' });
          if (res.ok) {
            toast.success('Logout success');
            navigate('/');
          } else {
            toast.error('Logout failed');
          }
        } catch (error) {
          toast.error('Something went wrong');
          console.error('Something went wrong:', error);
        }
      };


    useEffect(() => {
      const fetchEmployer = async () => {
        try {
          const response = await fetch('api/get-employer', {
            method: 'GET',
            credentials: 'include', // Include credentials in the request
          });
          if (response.ok) {
            const data = await response.json();
            setEmployer(data);
          } else {
            console.error('Failed to fetch employer data', response.statusText);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
    
      fetchEmployer();
    }, []);
    
  return (
   <>
    <div
        className="flex  bg-gradient-to-r from-blue-700 to-green-400 text-center w-[75%] m-auto mt-[5%] rounded-2xl h-[540px] border-2">

        <div
            className="dash bg-gradient-to-r from-green-600 to-blue-400 text-white p-8 rounded-lg mt-[2%] ml-[10px] h-[500px] border-2 border-white">
            <h2 className="font-sans text-2xl font-bold ">Welcome <span className='text-3xl text-yellow-300 font-bold animate-pulse' >{employer.co_name}</span></h2>
            <hr className="my-4 border-t border-blue-500"/>
            <Link to="" className="block mt-[-75px] ">
                <input type="submit" value="Add a Job" onClick={handelAddjob}
                    className="bg-purple-900 text-white py-2  rounded cursor-pointer w-[90%] mt-[50%] hover:bg-purple-600 transition ease-in-out delay-4s"/>
            </Link>
            <Link to="#" className="block my-2">
                <input type="submit" value="View jobs" onClick={viewJobs}
                    className="bg-purple-900 text-white py-2  rounded cursor-pointer w-[90%]  hover:bg-purple-600 transition ease-in-out delay-4s"/>
            </Link>
            <Link to="#" className="block my-2">
                <input type="submit" value="View Applications" onClick={handleApplication}
                    className="bg-purple-900 text-white py-2 px-4 rounded cursor-pointer w-[90%] hover:bg-purple-600 transition ease-in-out delay-1s"/>
            </Link>
           
            <Link to ="/" className="block my-4">
              <input type="submit" value="Logout" onClick={logout} className="bg-purple-900 text-white py-2 px-4 rounded cursor-pointer w-[90%] hover:bg-purple-600 transition ease-in-out delay-1s0" />
            </Link>
        </div>
        {activeComponent === 'addjob' && <EmployerAddjob company={employer} />}
        {activeComponent === 'viewapplications' && <EmployerviewApplications/>}
        {activeComponent === 'viewjob' && <EmployerviewJobs company={employer}/>}

        </div>


   
   </>
  )
}

export default Employermaindiv
