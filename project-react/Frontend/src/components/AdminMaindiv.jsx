import React, { useState } from 'react'
import AdminaddEmployer from './AdminaddEmployer';
import AdminviewEmployer from './AdminviewEmployer';
import AdminremoveEmployer from './AdminremoveEmployer';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminMaindiv = () => {
    const [activeComponent, setActiveComponent] = useState('addemp');

    const handleaddEmployer = (event) => {
        event.preventDefault();
        setActiveComponent('addemp');
    };
    const handleviewEmployer = (event) => {
        event.preventDefault();
        setActiveComponent('viewemp');
    };
    const handleRemoveEmployer = (event) => {
        event.preventDefault();
        setActiveComponent('rememp');
    };

    const navigate=useNavigate()
    const logout= async()=>{
        try{
        const res=await fetch('/api/logout')
        if(res.ok){
            toast.success('Logout success')
            navigate('/')

        }
        }
        catch(error)
        {
            toast.error('something went wrong')
            // console.log('something went wrong');
        }

    }

    return (
        <>
            <div className="main h-[600px] w-[70%] bg-gray-300 mx-auto mt-10 rounded-lg flex">

                <div className="dash bg-gradient-to-r from-blue-300 to-blue-700 text-white p-8 rounded-lg mr-8 mt-12 h-[440px] ml-[5%] ">
                    <Link to ="#addemp" className="block my-2">
                        <input type="submit" value="Add Employer" onClick={handleaddEmployer} className="bg-purple-900 text-white py-2 px-4 rounded cursor-pointer w-[95%] hover:bg-purple-600 mt-[50%]" />
                    </Link>
                    <Link to ="#vwemp" className="block my-2">
                        <input type="submit"  onClick={handleviewEmployer} value="View Employers" className="bg-purple-900 text-white py-2 px-4 rounded cursor-pointer w-[95%] hover:bg-purple-600" />
                    </Link>
                    <Link to ="#rmemp" className="block my-2">
                        <input type="submit" value="Remove Employers" onClick={handleRemoveEmployer} className="bg-purple-900 text-white py-2 px-4 rounded cursor-pointer w-[95%] hover:bg-purple-600" />
                    </Link>
                    <Link to ="/" className="block my-2">
                        <input type="submit" value="Logout" onClick={logout} className="bg-purple-900 text-white py-2 px-4 rounded cursor-pointer  hover:bg-purple-600 w-[95%]" />
                    </Link>


                </div>

                {activeComponent === 'addemp' && <AdminaddEmployer />}
                {activeComponent === 'viewemp' && <AdminviewEmployer />}
                {activeComponent === 'rememp' && <AdminremoveEmployer />}



            </div>

        </>
    )
}

export default AdminMaindiv
