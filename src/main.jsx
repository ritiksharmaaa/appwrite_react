import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js';
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import {Protected , Login } from './components/index.js'

//  importin all pages 

import AllPosts from './pages/AllPost'
import AddPost from './pages/AddPost'
import  Home from './pages/Home'
import EditPost from './pages/EditPost'
import Post from './pages/Post'
// import Login from './pages/LogIn'
import Signup from './pages/Signup'


const router = createBrowserRouter([
  // {path: '/' ,action: () => App/>}
  {
    path : '/',
    element : <App/>,
    children: [
      {
        path : '/',
        element : <Home />
      },
      {
        path : '/login',
        element : (
        < Protected authentication={false}>
        <Login/>
        
        </Protected>
        
        )
      },
      {
        path : '/singup',
        element : (
        < Protected authentication={false}>
        <Signup/>
        
        </Protected>
        
        )
      },
      {
        path : '/all-posts',
        element : (
        < Protected authentication={true}>
          {" "}
        <AllPosts/>
        
        </Protected>
        
        )
      },
      {
        path : '/add-post',
        element : (
        < Protected authentication={true}>
          {" "}
        <AddPost/>
        
        </Protected>
        
        )
      },
      {
        path : '/edit-post/:slug',
        element : (
        < Protected authentication={true}>
        <EditPost />
        
        </Protected>
        
        )

      },
      {
        path : '/post/:slug',
        element : <Post/>
      },
      
    ],
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>

    {/* <App />  remove for adding router */}
    </Provider>
  </React.StrictMode>,
)
