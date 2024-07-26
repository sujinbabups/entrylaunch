import React from 'react'
import HeroCandidate from '../components/HeroCandidate'
import CandidateMaindiv from '../components/CandidateMaindiv'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from 'react-router-dom';

const Candidatelayout = () => {
  return (
   <>
     <HeroCandidate/>
     <CandidateMaindiv/>
     <Outlet/>
     <ToastContainer/>

   
   </>
  )
}

export default Candidatelayout
