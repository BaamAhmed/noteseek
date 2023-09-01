"use client"
import {useState} from 'react'
import Image from 'next/image'
import registerImg from './register.png'
import {register} from '@/firebase/auth.js'
import { useRouter } from 'next/navigation'
import { useAuthContext } from '@/context/AuthContext'

export default function Register() {
    const [email, setEmail] = useState('')
    const [emailValid, setEmailValid] = useState(false)
    const [password, setPassword] = useState('')
    const [passwordValid, setPasswordValid] = useState(false)
    const [confirmPass, setConfirmPass] = useState('')
    const {user} = useAuthContext()
    const router = useRouter()
    
    if (user != null) router.push('/dashboard')


    return (
        <div className="min-h-screen px-36">
            <div className="grid min-h-screen grid-cols-2 gap-3 items-center">
                
                <Image 
                    src={registerImg}
                    width={500}
                    height={500}
                />
               
                <div className='flex flex-col text-right'>
                    <h1 className="text-6xl font-bold mb-5">create account</h1>
                    
                    <label htmlFor="" className='mb-2'>email</label>
                    <input onChange={(e) => setEmail(e.target.value)} placeholder='john.doe@email.com' value={email} type="text" className='border-black border-4 rounded-xl p-2 mb-5 px-4 text-right' />
                    <label htmlFor="" className='mb-2'>password</label>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" value={password} className='border-4 border-black rounded-xl p-2 mb-5 px-4 text-right' />
                    <label htmlFor="" className='mb-2'>confirm password</label>
                    <input onChange={(e) => setConfirmPass(e.target.value)} type="password" value={confirmPass} className='border-4 border-black rounded-xl p-2 mb-10 px-4 text-right' />
                    <div className='flex flex-row-reverse'>
                        <button onClick={() => register(email, password)} className='px-3 p-2 border-4 border-black rounded-xl w-1/5 text-xl font-bold drop-shadow-sharp bg-white mb-3'>register</button>
                    </div>
                    
                    <p>already have an account? <a href='login' className='underline hover:font-bold'>log in</a> here</p>
                </div>
                
            </div>
        </div>
    )
}