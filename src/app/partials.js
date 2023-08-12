"use client"
import { useAuthContext } from "@/context/AuthContext";

export const Header = () => {
    const { user } = useAuthContext()
    console.log('USER')
    console.log(user)
    return (
        <div className='min-w-screen p-3 px-10 flex justify-between items-center'>
            <a href="/" className='font-bold text-4xl'>noteseek</a>
            <a href="login" className='font-bold text-xl hover:underline'>{user == null ? 'login' : 'dashboard'}</a>
        </div>
    )
}