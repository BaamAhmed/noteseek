"use client"
import {useState, useEffect} from 'react'
import Image from 'next/image'
import verifyImg from '../login/login.png'
import {sendVerificationEmail} from '@/firebase/auth.js'
import { useRouter } from 'next/navigation'
import { useAuthContext } from '@/context/AuthContext'

export default function Verify() {

    const {user} = useAuthContext()
    const router = useRouter()
    
    useEffect(() => {
        if (user == null) {
            router.push('/login')
        } else if (user.emailVerified) {
            router.push('/dashboard')
        }
    }, [user])

    return (
        <div className="min-h-screen px-36 flex flex-col justify-center items-center">
            <Image 
                src={verifyImg}
                width={300}
                height={300}
            />
            <p className='text-2xl font-bold mb-3'>Verification Required</p>
            <p className='text-sm w-1/3 text-center mb-10'>A verification email has been sent to <span className='font-bold'>{user ? user.email: '[email]'}</span>. Please click the link in that email to verify your account before accessing NoteSeek.</p>
            <button onClick={() => sendVerificationEmail()} className='font-bold rounded-xl border-black border-4 p-3 px-5 drop-shadow-sharp bg-white hover:bg-slate-200 mb-5'>Resend Email</button>
        </div>
    )
}