"use client"
import {useState, useLayoutEffect} from  'react'
import {useRouter} from 'next/navigation'
import Image from 'next/image'
import loginImg from '../login/login.png'
import login from '@/firebase/auth/login'
import { useAuthContext } from '@/context/AuthContext'


export default function Feedback() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {user} = useAuthContext()

    const handleSubmission = async () => {
        const {result, error} = await login(email, password)
        if (error) {
            console.log(error)
        } else {
            router.push('/dashboard')
        }
    }


    return (
        <div className="min-h-screen px-36">
            <h1 className='font-bold text-5xl mt-24 mb-3'>Feedback</h1>
            <p className='text-sm mb-10'>Thank you for taking the time out to fill this form! :D</p>
            
            <div className='flex flex-col w-3/5'>
                <form action="https://public.herotofu.com/v1/8a6bb1d0-aff7-11ed-bca4-27c965651142" method="post">
                    <div className="grid grid-cols-2 gap-2 mb-2">
                        <input required name='firstName' placeholder="First Name" type="text" className="rounded-xl bg-white border-black border-4 py-2 px-4" />
                        <input name='lastName' placeholder="Last Name" type="text" className="border-4 border-black rounded-xl bg-white py-2 px-4" />
                    </div>
                    <input required name='email' placeholder="Email Address" type="email" className="border-4 border-black rounded-xl w-full bg-white py-2 px-4 mb-2"/>
                    <textarea required name="msg" placeholder="Please provide details if reporting bugs, it'll help me squash them faster :)" className="border-4 border-black bg-white mb-2 rounded-xl w-full py-2 px-4" id="" cols={30} rows={10}></textarea>
                    <button className="rounded-xl border-4 border-black bg-white drop-shadow-sharp font-semibold text-center w-full py-2 hover:bg-slate-300">Submit</button>
                </form>
            </div>
            
        </div>
    )
    
}