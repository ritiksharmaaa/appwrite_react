import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js';
import { createBrowserRouter } from 'react-router-dom'
import Protected from './components/AuthLayout.jsx'
import AllPost from './pages/AllPost.jsx'
import AddPost from './pages/AddPost.jsx'


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
        element : ()=>{
        < Protected authentication={false}>
        <Login/>
        
        </Protected>
        
        }
      },
      {
        path : '/singup',
        element : ()=>{
        < Protected authentication={false}>
        <Signup/>
        
        </Protected>
        
        }
      },
      {
        path : '/all-posts',
        element : ()=>{
        < Protected authentication={true}>
        <AllPost/>
        
        </Protected>
        
        }
      },
      {
        path : '/add-posts',
        element : ()=>{
        < Protected authentication={true}>
        <AddPost/>
        
        </Protected>
        
        }
      },
      {
        path : '/edit-post/:slug',
        element : ()=>{
        < Protected authentication={true}>
        <AddPost/>
        
        </Protected>
        
        }

      },
      {
        path : '/edit-post/:slug',
        element : (
         < Protected authentication>
         < EditPost />
         
         </Protected>

        )
      },
      {
        path : '/post/:slug',
        element : (
         < Protected authentication>
         < Post />
         
         </Protected>

        )
      }
    ]
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
