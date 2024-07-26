import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Employerlogin = ({ show, handleClose }) => {
    if (!show) {
        return null;
      }
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const navigate=useNavigate();

      const loginSubmit = async (e) => {
        e.preventDefault();
        const loginDetails = {
            email,
          password,
        };
        const res = await fetch("api/employer-login", {
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
            return navigate("/employer");
      
          } else {
            toast.error(`Please check your credentials`);
            return navigate("/");
          }
        }


  return (
 <>
     <div id="emplog" className="fixed top-[200px] right-[10px] bg-gray-700 p-6 rounded-lg shadow-lg  w-[22%]  text-white">
        <a href="#" className="float-right text-4xl mb-4" onClick={handleClose}>&times;</a>
        {/* <a href="#empreg" className="float-right text-blue-600 font-bold mb-4">Register</a> */}
        <h3 className="text-2xl font-medium mb-4">Employer Login</h3>
    
        <form className="mt-6" onSubmit={loginSubmit}>
            <label htmlFor="username" className="block text-lg">Email ID</label>
            <input type="email" name="email" id="emp_uname" value={email} onChange={(e) => setEmail(e.target.value)}
                className="block w-full h-10 bg-black font-mono rounded-lg text-center text-lg mt-2 mb-4" placeholder="Email ID"/>
            <label htmlFor="pass" className="block text-lg">Password</label>
            <input type="password" name="password" id="emp_pass" value={password} onChange={(e) => setPassword(e.target.value)}
                className="block w-full h-10 bg-black font-mono rounded-lg text-center text-lg mt-2 mb-4" placeholder="**********"/>
            <input type="submit" value="Login" 
                className="w-full h-10 bg-blue-800 text-white font-bold rounded-lg mt-4 cursor-pointer hover:bg-blue-600"/>
        </form>
    </div>
 
 </>
  )
}

export default Employerlogin
