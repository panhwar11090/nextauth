'use client'
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const SignUpPage = () => {

    const router = useRouter();

    const [user ,setUser ] = useState({
        email:"",
        username:"",
        password:"",
    })

    const [buttonDisabled, setButtonDisabled] = useState(false);

    const [loading, setLoading] = useState(false)

    const onSignup = async()=>{
        try {
            setLoading(true)

            const response = await axios.post('/api/users/signup',user);
            console.log('signup success',response.data)
            router.push('/login')
            
        } catch (error:any) {
            console.log("signup failed", error.message)
            toast.error(error.message)
        } finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
           setButtonDisabled(false) 
        }
        else{
            setButtonDisabled(true)
        }
    },[user])

  return (
    <div  className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>{loading ? "Processing" :"SignUp"}</h1>
        <label htmlFor='username'>username</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="username"
          value={user.username}
          onChange={(e)=> setUser({...user,username:e.target.value})}
          placeholder="email"
        />
        <label htmlFor='email'>email</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="email"
          value={user.email}
          onChange={(e)=> setUser({...user,email:e.target.value})}
          placeholder="email"
        />

        <label htmlFor='password'>password</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="password"
          value={user.password}
          onChange={(e)=> setUser({...user,password:e.target.value})}
          placeholder="password"
        />
        <button
            onClick={onSignup}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        >{buttonDisabled ?"noSignup" : "SignUp"}</button>

        <Link href="/login">Visit login page</Link>

    </div>
  )
}

export default SignUpPage