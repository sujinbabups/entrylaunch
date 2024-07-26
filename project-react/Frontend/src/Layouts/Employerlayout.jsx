import React from 'react'
import HeroCandidate from '../components/HeroCandidate'
import Employermaindiv from '../components/Employermaindiv'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Employerlayout = () => {
  return (
 <>
    <HeroCandidate/>
    <Employermaindiv/>
    <ToastContainer/>
 </>
  )
}

export default Employerlayout
