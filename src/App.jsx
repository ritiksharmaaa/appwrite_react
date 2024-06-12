import React , { useState  , useEffect  } from 'react'
import './App.css'
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import {Header , Footer} from './components';
import { Outlet} from 'react-router-dom'

// console.log(process.env.React_APP_APPWRITE_URL); this not work in vite react so we use another .
// console.log(import.meta.env.VITE_APPWRITE_URL)

function App() {
  const [loading , setLoading] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
        TODO:  <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

// or 

// return !loading ? () : () ; this type of code you can also see in many react code .

export default App
