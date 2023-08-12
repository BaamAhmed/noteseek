// import {useState} from 'react'
import Image from 'next/image'
import jumbotronMain from '../jumbotron_main.png'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

export default function Register() {

    return (
        <div className="min-h-screen px-36">
            <div className="grid min-h-screen grid-cols-2 gap-3 items-center">
                
                <Image 
                    src={jumbotronMain}
                    width={500}
                    height={500}
                />
               
                <div className='flex flex-col text-right'>
                    <h1 className="text-6xl font-bold mb-5">THIS IS THE DASHBOARD</h1>
                    <form action="auth/register" method='POST' className='flex flex-col mb-5'>
                        <label htmlFor="" className='mb-2'>email</label>
                        <input placeholder='john.doe@email.com' type="text" className='border-4 border-black rounded-xl p-2 mb-5 px-4 text-right' />
                        <label htmlFor="" className='mb-2'>password</label>
                        <input type="password" className='border-4 border-black rounded-xl p-2 mb-5 px-4 text-right' />
                        <label htmlFor="" className='mb-2'>confirm password</label>
                        <input type="password" className='border-4 border-black rounded-xl p-2 mb-10 px-4 text-right' />
                        <div className='flex flex-row-reverse'>
                            <button className='px-3 p-2 border-4 border-black rounded-xl w-1/5 text-xl font-bold drop-shadow-sharp bg-white'>register</button>
                        </div>
                    </form>
                    <p>already have an account? <a href='login' className='underline hover:font-bold'>log in</a> here</p>
                </div>
                
            </div>
        </div>
    )
}