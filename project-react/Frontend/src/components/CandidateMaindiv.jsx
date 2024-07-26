import React, { useState } from 'react'
import CandidteHome from './CandidteHome'
import Candidateprofile from './Candidateprofile';
import CandidateApplications from './CandidateApplications';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const CandidateMaindiv = () => {
    const [activeComponent, setActiveComponent] = useState('profile');
    const navigate=useNavigate()

  const handleHomeClick = (event) => {
    event.preventDefault();
    setActiveComponent('home');
  };

  const handleProfileClick = (event) => {
    event.preventDefault();
    setActiveComponent('profile');
  };

  const handleApplications=(event)=>{
    event.preventDefault();
    setActiveComponent('applications');
  }
  

  const canlogout = async () => {
    try {
      const res = await fetch('/api/canlogout', { method: 'POST' });
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
    
  return (
   <>
   
    <div className="maindiv h-[600px] w-[70%] bg-gray-300 mx-auto mt-28 rounded-lg flex ">
        <div className="dashb bg-gradient-to-r from-blue-300 to-blue-700 text-white p-8 rounded-lg ml-[3%] relative top-[5%] w-[25%] h-[540px] ">
            {/* <h3 className="text-xl font-semibold ml-[38%]">Name</h3> */}
            <Link to="#profile" className="block my-4 mt-[25%]">
                <input type="submit" value="Profile" onClick={handleProfileClick} className="bg-purple-900 text-white py-2 px-4 rounded cursor-pointer w-[65%] ml-[15%] hover:bg-purple-600"/>
            </Link>
            <hr className="my-6 border-t border-blue-400"/>
           
            <Link to="#cnhome" className="block my-4">
                <input type="submit" value="My Home" onClick={handleHomeClick} className="bg-purple-900 text-white py-2 px-4 rounded cursor-pointer w-[65%] ml-[15%] hover:bg-purple-600"/>
            </Link>
            <Link to="#appli" className="block my-4">
                <input type="submit" value="My Applications" onClick={handleApplications}className="bg-purple-900 text-white py-2 px-4 rounded cursor-pointer w-[65%] ml-[15%] hover:bg-purple-600"/>
            </Link>
            <Link to ="/" className="block my-4">
              <input type="submit" value="Logout" onClick={canlogout} className="bg-purple-900 text-white py-2 px-4 rounded cursor-pointer w-[65%] ml-[15%] hover:bg-purple-600" />
            </Link>

        </div>
        {activeComponent === 'home' && <CandidteHome  />}
        {activeComponent === 'profile' && <Candidateprofile/>}
        {activeComponent === 'applications' && <CandidateApplications />}
        

       
      
    </div>
 
    


   </>
  )
}

export default CandidateMaindiv
