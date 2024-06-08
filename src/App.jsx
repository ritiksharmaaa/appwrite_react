import React , { useState  , useEffect  } from 'react'
import './App.css'
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import {Header , Footer} from './components';

// console.log(process.env.React_APP_APPWRITE_URL); this not work in vite react so we use another .
// console.log(import.meta.env.VITE_APPWRITE_URL)

function App() {
  const [loading , setLoading] = useState(false)
  const dispatch = useDispatch()

  // useEffect(() => {
  //   authService.getCurrentUser()
  //   .then((userdata) =>{
  //     if (userdata){
  //       dispatch(login({userdata}))

  //     }else{
  //       dispatch(logout())

  //     }
      
  //   })
  //   .finally(()=>
  //     setLoading(false)
  //   )

    


  // } , [])

  if (!loading){
    return (
      <div className=' flex flex-wrap flex-content-between bg-gray-800 text-cyan-50'>
        <div className="w-full block">
          <Header  />
          <div>Main content </div>
          {/* <Outlet /> */}
          <Footer />
        </div>
      </div>
    )
  }else{
    return(
      <div>
        i am logout 
      </div>
    )
  }
}


// or 

// return !loading ? () : () ; this type of code you can also see in many react code .

export default App
