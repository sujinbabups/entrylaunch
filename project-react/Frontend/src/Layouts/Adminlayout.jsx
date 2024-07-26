import React from 'react'
import AdminMaindiv from '../components/AdminMaindiv'
import HeroCandidate from '../components/HeroCandidate'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Adminlayout = () => {
  return (
   <>
   <HeroCandidate/>
   <AdminMaindiv/>
   <ToastContainer/>

   </>
  )
}

export default Adminlayout
