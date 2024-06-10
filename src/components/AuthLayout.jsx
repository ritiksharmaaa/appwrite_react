import React, { useEffect, useState } from 'react'
import { useSelector  } from 'react-redux'

import { useNavigate } from 'react-router-dom'

function Protected({children , authentication=true}) {
    const  [ loader , setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)
    const naviagate = useNavigate()
    useEffect(()=>{
        if( authentication && authStatus !== authentication){
            naviagate("/login")

        }else if(!authentication && authStatus !== authentication){
            naviagate("/")

        }
        setLoader(false)
            

    } , [authStatus , naviagate , authentication])

  return loader ?<h1>loading...</h1> : <> {children}</>
}

export default  Protected

//  this can run when you are setting up your reduch router ....