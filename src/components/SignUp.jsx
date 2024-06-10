import React , {useState} from 'react'
import authService from '../appwrite/auth'
import { Link , useNavigate} from "react-router-dom"
import {Input , Button, Logo ,} from './index'
import { login  } from '../store/authSlice' 
import { useDispatch } from 'react-redux'
import{useform  } from 'react-hook-form'

function SignUp() {
  const navigate = useNavigate()
  const [error , setError]  = useState("")
  const dispatch = useDispatch()
  const [ register , handelSubmit] = useform()

  const create = async(data) => {
    setError("")
    try {
       const userdata = await authService.createAccount(data)
       if (userdata){
        const userdata = await authService.getCurrentUser()
        if (userdata) dispatch(login(userdata))
        navigate("/")
       }
      
    } catch (error) {
      setError(error.message
        )
      
    }
  }

  return (
    <div className='flex items-center justify-center '>
      <div className={` mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border-black/10`}>
        <div className="inline-block w-full max-w-[100px]">

          <Logo width="100px" />
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight"> Sign in to your account </h2>
            <p className="mt-2 text-center text-base text-black" >
                if you  have any account?npsp: <Link to="signin" className='font-medium text-primary translate-all duration-200 hover:underline '> Sign In </Link>
            </p>
            {error &&  <p className="text-red-600 mt-8 text-center"> {error}</p> }
            <form onSubmit={handelSubmit(create)} className='mt-8'>
                <div className="space-y-5">
                    <Input
                    label="Email"
                    placeholder="Enter your email ! "
                    type="email"
                    {...register('email' , { 
                        required : true ,
                        validate : {
                            matchPatern: (value) => /^\w+([._]?\w+@\w+)*(\.\w{2,3})+$/.test(v) || "Email address must be a valid address",
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
                        Create Account
                    </Button>
                </div>
            </form>

        
      </div>
    </div>
  )
}

export default SignUp