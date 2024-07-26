import React, { useState } from 'react'
import Candidatelogin from './Candidatelogin';
import Employerlogin from './Employerlogin';
import Adminlogin from './Adminlogin';
import { Link } from 'react-router-dom';

import '../App.css'

const Navbar = () => {
    const [loginType, setLoginType] = useState(null);

    const handleCandidateClick = (event) => {
        event.preventDefault();
        setLoginType('candidate');
      };
    
      const handleEmployerClick = (event) => {
        event.preventDefault();
        setLoginType('employer');
      };
    
      const handleAdminClick = (event) => {
        event.preventDefault();
        setLoginType('admin');
      };
    
      const handleCloseClick = (event) => {
        event.preventDefault();
        setLoginType();
      };
    

  return (
   <>
   <div
        className="flex justify-between items-center bg-gradient-to-t from-gray-200 via-blue-400 to-blue-400 h-24 w-full px-4">
         <div className="relative left-2">
      <h3 className="text-4xl font-semibold font-sans text-white">
        {'EntryLaunch'.split('').map((letter, index) => (
          <span
            key={index}
            className="slide-in1"
            style={{ animationDelay: `${index * .1}s` }}
          >
            {letter}
          </span>
        ))}
      </h3>
    </div>
        <div className="flex space-x-16 relative left-[-20px] ">
            <ul className="flex space-x-16 cursor-pointer">
                <li><Link to ="/" className="text-xl text-blue-900 font-bold hover:text-white transition duration-500 ">Home</Link></li>
                <li><Link to ="/recruiters" className="text-xl  text-blue-900 font-bold hover:text-white transition duration-500">Recruiters</Link></li>
                <li><Link to ="/contact" className="text-xl  text-blue-900 font-bold hover:text-white transition duration-500">Contact</Link></li>
            </ul>
        </div>
        <div className="relative right-20">
            <div className="relative inline-block group">
                <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md  ">Login as</button>
                <ul className="absolute right-0 w-40 bg-white shadow-lg rounded-md hidden group-hover:block z-40">
                    <li><Link to="" className="block px-4 py-2 hover:bg-gray-600 hover:text-white " onClick={handleCandidateClick}>Candidate</Link></li>
                    <li><Link to="" className="block px-4 py-2 hover:bg-gray-600 hover:text-white" onClick={handleEmployerClick}>Employer</Link></li>
                    <li><Link href="" className="block px-4 py-2 hover:bg-gray-600 hover:text-white" onClick={handleAdminClick}>Admin</Link></li>
                </ul>
            </div>
        </div>
    </div>

    {loginType === 'candidate' && <Candidatelogin show={true} handleClose={handleCloseClick} />}
    {loginType === 'employer' && <Employerlogin show={true} handleClose={handleCloseClick}/>}
    {loginType === 'admin' && <Adminlogin show={true} handleClose={handleCloseClick}/>}
    
   
   </>
  )
}

export default Navbar
