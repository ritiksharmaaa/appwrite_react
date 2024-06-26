import React , {useState } from 'react'
import {Link  , useNavigate } from 'react-router-dom'
import {login as authLogin } from '../store/authSlice'

import { Input, Button, Logo} from "./index";
import { useDispatch  } from 'react-redux'
import authService  from '../appwrite/auth'
import {useForm} from 'react-hook-form'



//  auth login is 


function Login(props) {
    const {callback} = props;
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const  {register , handleSubmit} = useForm()
    const [error , setError] = useState("")
//    doing asyn because we dont know how much time it take to get data from server 
    const login = async (data ) =>{
        setError('')
        try {
             const session = await authService.login(data)
             if (session){
                const userData = await authService.getCurrentUser()
                // console.log(userData)
                if (userData){
                    dispatch(authLogin(userData))
                    // console.log("we" , userdata)
                }
                navigate("/")
             }
        } catch (error) {
            setError(error.message)
            
        }


    }


  return (
    <div className='flex items-center justify-center w-full'>
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10 `}>
            <div className="mb-2 flex justify-center">
                <span className='inline-block w-full max-w[100px]'>
                    <Logo width="100%"/>
                </span>
                <button  onClick={callback}>
        X
      </button>

            </div>
            <h2 className="text-center text-2xl font-bold leading-tight"> Sign in to your account </h2>
            <p className="mt-2 text-center text-base text-black" >
                Don't have any account?npsp: <Link to="/signup" className='font-medium text-primary translate-all duration-200 hover:underline '> Sign Up</Link>
            </p>
            {error &&  <p className="text-red-600 mt-8 text-center"> {error}</p> }
            <form onSubmit={handleSubmit(login)} className='mt-8'>
                <div className="space-y-5">
                    <Input
                    label="Email"
                    placeholder="Enter your email ! "
                    type="email"
                    {...register('email' , { 
                        required : true ,
                        validate : {
                            matchPatern: (value) => /^\w+([._]?\w+@\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address",
                        }
                    })}
                    />
                    <Input 
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    {...props}
                    {...register('password' , {
                        required : true ,
                    })}

                    />
                    <Button 
                    type="submit"
                    className="w-full"
                    >
                        Sign In 
                    </Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login