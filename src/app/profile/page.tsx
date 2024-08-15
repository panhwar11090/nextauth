'use client'

import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import Link from 'next/link'

const ProfilePage = () => {
    const router = useRouter();
    const [data, setData] = useState('');

    const getUserDetails = async()=>{
        try {
            const res = await axios.get('/api/users/me');
            console.log(res.data);
            setData(res.data.data._id);
        } catch (error:any) {
            console.log(error.message)
            toast.error(error.message);
        }
    }

    const logout = async() =>{
        try {
          await axios.get('api/users/logout')
          toast.success('Logout Successfully')
          router.push('/login')
        } catch (error:any) {
            console.log(error.message)
            toast.error(error.message);        
        }
    }

  return (
    <div  className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>Profile</h1>
        <hr />
        <p>Profile Page</p>
        <h2 className='p-1 rounded bg-green-500'>
            {data === '' ? 'Nothing' : 
                <Link href={`/profile/${data}`}>
                    {data}
                </Link>
            }
        </h2>
        <hr />

        <button
            onClick={logout}
            className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
            Logout
        </button>    


        <button
            className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={getUserDetails}
        >
            GetUser Deatils
        </button>
    </div>
  )
}

export default ProfilePage