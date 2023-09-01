"use client"
import { useAuthContext } from "@/context/AuthContext";
import {logout} from '@/firebase/auth'
import { useRouter } from "next/navigation";
import loadingAnim from './loading.gif'
import Image from "next/image";
import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";



export const Header = () => {
    const router = useRouter()
    const { user } = useAuthContext()

    const handleAuth = () => {
        if (user == null) {
            router.push('/login')
        } else {
            const {result, error} = logout()
            if (error) {
                console.log(error)
            } else {
                router.push('/')
                console.log('done')
            }
        }
    }

    return (
        <>
            <div className='min-w-screen p-3 px-10 flex justify-between items-center'>
                <a href="/" className='font-bold text-2xl'>noteseek</a>
                <div className="flex">
                    <a href="/feedback" className='font-bold text-xl hover:underline mr-3'>feedback</a>
                    {user != null ? <a href="/dashboard" className='font-bold text-xl hover:underline mr-3'>dashboard</a> : null}
                    <button onClick={handleAuth} className='font-bold text-xl hover:underline'>{user == null ? 'login' : 'logout'}</button>

                </div>
            </div>
            <ToastContainer />
        </>
    )
}
export const Footer = () => {
    const router = useRouter()
    const { user } = useAuthContext()

    const handleAuth = () => {
        if (user == null) {
            router.push('/login')
        } else {
            const {result, error} = logout()
            if (error) {
                console.log(error)
            } else {
                router.push('/')
                console.log('done')
            }
        }
    }

    return (

        <div className='min-w-screen p-3 px-36 flex justify-between items-center'>
            <div>
              <p className='font-bold text-4xl'>noteseek</p>
              <p className='text-md'>learning powered by your notes</p>
            </div>
            <div className='w-2/5 text-center'>
              <p>“some very inspirational quote here because otherwise the website has nothing to put here”</p>
            </div>
            <div className='flex flex-col'>
              <a href="/" className='hover:underline font-bold text-right text-xl'>home</a>
              <a href="#" className='hover:underline font-bold text-right text-xl'>about</a>
              <a href="/feedback" className='hover:underline font-bold text-right text-xl'>feedback</a>
              <button onClick={handleAuth} className='hover:underline font-bold text-right text-xl'>{user == null ? 'login' : 'logout'}</button>
            </div>
        </div>
    
    )
}

export const LoadingScreen = () => {
    return (
        <div className="min-h-screen bg-white flex justify-center items-center">
            <Image src={loadingAnim} width={50} />

        </div>
    )
}