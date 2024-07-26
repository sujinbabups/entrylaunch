import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Adminlogin = ({show,handleClose}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate=useNavigate()

    const loginSubmit = async (e) => {
        e.preventDefault();
        const loginDetails = {
          username,
          password,
        };
        const res = await fetch("api/admin-login", {
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
            return navigate("/admin");
      
          } else {
            toast.error(`Please check your credentials`);
            return navigate("/");
          }
        }



    if (!show) {
        return null;
      }
  return (
   <>
    <div id="admlog" className="fixed top-[200px] right-[10px] bg-gray-700 w-[22%] p-6 rounded-lg shadow-lg ">
        <a href="#" className="float-right text-4xl mb-4" onClick={handleClose}>&times;</a>
        <h3 className="text-2xl font-medium mb-4"> Admin Login</h3>
        <form className="mt-6" onSubmit={loginSubmit}>
            <label htmlFor="username" className="block text-lg">Username</label>
            <input type="text" name="username" id="uname" value={username} onChange={(e) => setUsername(e.target.value)}
                className="block w-full h-10 bg-black font-mono text-white font-bold rounded-lg text-center text-lg mt-2 mb-4" placeholder="username"/>
            <label htmlFor="pass" className="block text-lg">Password</label>
            <input type="password" name="password" id="pass" value={password} onChange={(e) => setPassword(e.target.value)}
                className="block w-full h-10 bg-black text-white rounded-lg text-center text-lg mt-2 mb-4" placeholder="**********"/>
            <input type="submit" value="Login" 
                className="w-full h-10 bg-blue-800 text-white font-bold rounded-lg mt-4 cursor-pointer hover:bg-blue-600"/>
        </form>
    </div>
   
   </>
  )
}

export default Adminlogin
