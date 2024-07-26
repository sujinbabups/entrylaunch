
import {createBrowserRouter,createRoutesFromElements,RouterProvider,Route} from 'react-router-dom'
import Firstlayout from './Layouts/Firstlayout'
import Homepage from './pages/Homepage'
import Recruiters from './pages/Recruiters'
import Contactus from './pages/Contactus'
import Candidatelayout from './Layouts/Candidatelayout'
import Employerlayout from './Layouts/Employerlayout'
import Adminlayout from './Layouts/Adminlayout'
import Candidatelogin from './components/Candidatelogin'
import Candidateregister from './components/Candidateregister'


function App() {
  const router=createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path='/' element={<Firstlayout/>}>
      <Route index element={<Homepage/>}/>
      <Route path='/recruiters' element={<Recruiters/>}/>
      <Route path='/contact' element={<Contactus/>}/>
      {/* <Route path='/login' element={<Candidatelogin/>}/> */}
     

      </Route>

      <Route path='/candidate' element={<Candidatelayout/>}>
    
      {/* <Route path='/signup' element={<Candidateregister/>}/> */}

      </Route>
      <Route path='/employer' element={<Employerlayout/>}> 
        

      </Route>
      <Route path='/admin' element={<Adminlayout/>}>

      </Route>
      
      </>
    )
  )


  return (
    <>

    <RouterProvider router={router}/>
   
      
    </>
  )
}

export default App
