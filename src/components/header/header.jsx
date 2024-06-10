import React from 'react';
import { useSelector} from 'react-redux'
import { Container , Logo , LogoutButton  } from '../index.js'

import { Link , useNavigate } from 'react-router-dom'

function Header(){
    const authStatus = useSelector((state) => state.auth.status)
    // console.log(authStatus , " now i am working ")
    const navigate  =  useNavigate()
    const navItem = [
        {name : 'Home',
        slug :'/',
        active : true 
        },
        {
            name  :'singIn',
            slug : "/singin",
            active : !authStatus
        },
        {
            name : 'SingUp',
            slug : "/singup",
            active :  !authStatus
        },
        {
            name : "All Post",
            slug : "all-post" ,
            active :!authStatus
        },
        {
            name:"Add post",
            slug : "add-post",
            active : authStatus
        },
     ]
    return (
        <header className=" py-3 shadw ng-gray-500">
            <Container>
                <nav className="flex">
                    <div className="mr-4">
                        <Link to="/">
                        <Logo/>

                        </Link>

                    </div>
                    <ul className="flex ml-auto">
                        {navItem.map((item)=>(
                            item.active ? (
                                <li className='{item.name}'>
                                    <button className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' onClick={() => navigate(item.slug)}>{item.name}</button>
                                </li>
                            ) : null
                        ))}
                    </ul>
                </nav>
            </Container>
         

        </header>
    )
}


export default Header ;