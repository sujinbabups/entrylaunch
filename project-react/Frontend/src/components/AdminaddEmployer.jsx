import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminaddEmployer = () => {

    const [Emp_Id, setEmpId] = useState("");
    const [co_name, setConame] = useState("");
    const [place, setPlace] = useState("");
    const [type, setType] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate=useNavigate();

    const signupSubmit = async (employerDetails) => {
        const res = await fetch("api/add-employer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(employerDetails),
        });
        // return;
        console.log(res);
        if (res.ok) {
          toast.success("Added new Employer")
          // return navigate("/login");
        } else {
          toast.error(`Please check the input data`);
        //   return navigate("/signup");
        }
      };



    const submitForm = (e) => {
        e.preventDefault();
        const employerDetails = {
          Emp_Id,
          co_name,
          place,
          type,
          password,
          email,
        
        };
       
    
        signupSubmit(employerDetails);
      };
     
    
  return (
   <>
   <div className="addEmployer bg-gradient-to-r from-blue-700 to-blue-300 h-[440px] mt-12 w-[70%] rounded-lg" id="addemp">
            <h2 className="text-2xl font-sans mt-8 ml-10  text-white font-bold">Add a New Employer</h2>
            <form  onSubmit={submitForm} id="addemprl">
            <table className="min-w-full mt-4  w-[90%] bg-white shadow-md rounded-lg text-xl font-bold">
                <thead>
                    <tr>
                        <th className="bg-purple-900 text-white h-12 p-2">Emp_Id</th>
                        <th className="bg-purple-900 text-white h-12 p-2">Co.Name</th>
                        <th className="bg-purple-900 text-white h-12 p-2">Place</th>
                        <th className="bg-purple-900 text-white h-12 p-2">Type of Co.</th>
                        <th className="bg-purple-900 text-white h-12 p-2">Email</th>
                        <th className="bg-purple-900 text-white h-12 p-2">Password</th>
                        
                    </tr>
                </thead>
                <tbody>
                    <tr className="ipfeild">
                       
                            <td className="p-2"><input type="text" name="employer_id" id="employer_id" value={Emp_Id} onChange={(e) => setEmpId(e.target.value)} required className="border p-2 rounded w-full"/></td>
                            <td className="p-2"><input type="text" name="co_name" id="co_name" value={co_name} onChange={(e) => setConame(e.target.value)} required className="border p-2 rounded w-full"/></td>
                            <td className="p-2"><input type="text" name="place" id="place" value={place} onChange={(e) => setPlace(e.target.value)} required className="border p-2 rounded w-full"/></td>
                            <td className="p-2"><input type="text" name="type" id="type" value={type} onChange={(e) => setType(e.target.value)} required className="border p-2 rounded w-full"/></td>
                            <td className="p-2"><input type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="border p-2 rounded w-full"/></td>
                            <td className="p-2"><input type="text" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="border p-2 rounded w-full"/></td>
                        
                    </tr>
                </tbody>
            </table>
            <input type="submit" value="Add"  className="bg-green-600 hover:bg-green-800 text-white py-2 px-4 rounded cursor-pointer float-right relative right-[40px] top-[10px]"/>
            </form>
        </div>

   
   </>
  )
}

export default AdminaddEmployer
