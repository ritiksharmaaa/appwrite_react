import React from 'react';
import { useSelector} from 'react-redux'
import { Container , Logo , LogoutBtn  } from '../index.js'

import { Link , useNavigate } from 'react-router-dom'
// import { useId } from 'react';

function Header(){
    const authStatus = useSelector((state) => state.auth.status)
    // console.log(authStatus , " now i am working ")
    const navigate  =  useNavigate()
    const navItems = [
        {name : 'Home',
        slug :'/',
        active : true 
        },
        {
            name  :'Login',
            slug : "/login",
            active : !authStatus
        },
        {
            name : 'SingUp',
            slug : "/singup",
            active :  !authStatus
        },
        {
            name : "All Posts",
            slug : "/all-posts" ,
            active :authStatus
        },
        {
            name:"Add post",
            slug : "/add-post",
            active : authStatus
        },
     ]
    return (
        <header className=" py-3 shadw ng-gray-500">
            <Container>
                <nav className="flex">
                    <div className="mr-4">
                        <Link to="/">
                        <Logo width="70px"/>

                        </Link>

                    </div>
                    <ul className='flex ml-auto'>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <button
                onClick={() => navigate(item.slug)}
                className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                >{item.name}</button>
              </li>
            ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>

                </nav>
            </Container>
         

        </header>
    )
}


export default Header ;