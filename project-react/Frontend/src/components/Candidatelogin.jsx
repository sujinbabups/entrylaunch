import React, { useState } from 'react'
import Candidateregister from './Candidateregister';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


import 'react-toastify/dist/ReactToastify.css';

const Candidatelogin = ({ show, handleClose }) => {
  const [loginType, setLoginType] = useState()

  const handleCandidateReg = (event) => {
    event.preventDefault();
    setLoginType('register');

  };

  const handleCloseClick = (event) => {
    event.preventDefault();
    setLoginType(null);
  };
  if (!show) {
    return null;
  }



  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginSubmit = async (e) => {
    e.preventDefault();
    const loginDetails = {
      email,
      password,
    };

    const res = await fetch("api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginDetails),
    });
    console.log(res, "login res from /login");
    if (res.ok) {
      // console.log('/login resp json', data)
      const data = await res.json();
      const userType = data.userType;
      console.log('usertype ', userType)
      toast.success(`Logged in success`);
      return navigate("/candidate");

    } else {
      toast.error(`Please check your credentials`);
      return navigate("/");
    }
  }
  return (
    <>
      <div id="logDiv"
        className="fixed top-[200px] right-[10px] bg-gray-700 text-white w-[22%] h-[380px] p-6 rounded-lg shadow-lg ">
        <a href="#" className="float-right text-4xl mb-4" onClick={handleClose}>&times;</a>
        <h3 className="text-2xl font-medium mb-4"> Candidate Login</h3>
        <a href="#canReg" onClick={handleCandidateReg} className="float-right text-blue-600 font-bold mb-4">Register</a>
        <form id="loginButton" className="mt-6" onSubmit={loginSubmit}>
          <span id="message"></span>
          <label htmlFor="username" className="block text-lg">Email ID</label>
          <input type="email" name="email" id="user_email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="block w-full h-10  bg-black rounded-lg text-center text-lg font-mono narrow mt-2 mb-4" placeholder="Email ID"
            required />
          <label htmlFor="pass" className="block text-lg">Password</label>
          <input type="password" name="password" id="user_pass"  value={password} onChange={(e) => setPassword(e.target.value)}
            className="block w-full h-10  bg-black rounded-lg text-center text-lg mt-2 mb-4" placeholder="******"
            required />
          <a href="/candidate"><input type="submit" value="Login"
            className="w-full h-10 bg-blue-800 text-white font-bold rounded-lg mt-4 cursor-pointer hover:bg-blue-600" /></a>
        </form>
      </div>
      {loginType === 'register' && <Candidateregister show={true} handleClose={handleCloseClick} />}

    </>
  )
}

export default Candidatelogin
