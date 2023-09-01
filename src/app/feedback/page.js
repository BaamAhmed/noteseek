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
            <div className="grid min-h-screen grid-cols-2 gap-3 items-center">
                <div className='flex flex-col'>
                    <h1 className="text-6xl font-bold mb-5">login</h1>
                    
                    <label htmlFor="" className='mb-2'>email</label>
                    <input onChange={(e) => setEmail(e.target.value)} name='email' placeholder='john.doe@email.com' value={email} type="text" className='border-4 border-black rounded-xl p-2 mb-5 px-4' />
                    <label htmlFor="" className='mb-2'>password</label>
                    <input onChange={e => setPassword(e.target.value)} name='password' type="password" value={password} className='border-4 border-black rounded-xl p-2 mb-10 px-4' />
                    <button onClick={handleSubmission} className='px-3 p-2 border-4 border-black rounded-xl w-1/5 text-xl font-bold drop-shadow-sharp bg-white mb-3'>login</button>

                    
                    <p>don’t have an account? <a href='register' className='underline hover:font-bold'>create one here</a></p>
                </div>
                <div className='flex flex-row-reverse'>
                    <Image 
                        src={loginImg}
                        width={500}
                        height={500}
                    />
                </div>
            </div>
        </div>
    )
    
}