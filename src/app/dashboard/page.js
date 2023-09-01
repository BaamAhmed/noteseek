"use client"

import {useState, useEffect} from 'react'
import Image from 'next/image'
import jumbotronMain from '../jumbotron_main.png'
import { useAuthContext } from '@/context/AuthContext'
import {BsFillExclamationTriangleFill, BsFileEarmarkTextFill} from 'react-icons/bs'
import { fetchDocList } from '@/firebase/document'
import avatar from './avatar.png'
import {useRouter} from 'next/navigation'
import {toast} from 'react-toastify'

export default function Dashboard() {
    const {user} = useAuthContext()
    // const [showFeedback, setShowFeedback] = useState(true)
    const [docList, setDocList] = useState([])
    const router = useRouter()



    useEffect(() => {
        if (user == null) {
            router.push('/login')
            // console.log('hello')

        } else if (!user.emailVerified) {
            router.push('/verify')
        }
        toast.info('This is a beta version of noteseek. If you would like to report a bug or share other feedback, please do so on the "Feedback" page.', {
            position: toast.POSITION.TOP_CENTER
        });
        const fetchUserDocuments = async () => {
            
            if (user) {
                const documents = await fetchDocList(user.uid)
                setDocList(documents)
                if (documents.length == 5) {
                    toast.warn("Documents are capped at 5 per user during the testing phase. If you want to upload more, contact me at b3ahmed@uwaterloo.ca", {position: toast.POSITION.TOP_CENTER})
                }
            }
        }
        fetchUserDocuments()
        
    }, [user])

    const sampleDocs = [
        {
            filename: 'Math_135_Final.pdf',
            pages: 5,
            id: 'SeXxxAgiJGzsWWttv4GA'
        },
        {
            filename: 'Econ_Inequality.pdf',
            pages: 3,
            id: '756dg97823yh4er8'
        },
        {
            filename: 'Chemistry_notes.pdf',
            pages: 1,
            id: '28367eh298odgh2'
        },
        {
            filename: 'Final_review_stats.pdf',
            pages: 7,
            id: '67123eg92o3yu8dg'
        },
    ]
    return (
        <div className="min-h-screen px-36 pt-24">
            <div className='mb-24'>
                <div className='w-full flex justify-between mb-5'>
                    <div>
                        <h1 className='font-bold text-5xl'>dashboard</h1>
                        <p>Welcome back!</p>
                    </div>
                    <Image src={avatar} width={100} />
                </div>
               
            </div>
            <div>
                <div className="w-full flex justify-between items-center mb-5">
                    <h4 className='font-bold text-3xl'>uploaded documents</h4>
                    <button onClick={() => {router.push('/documents/upload')}} disabled={docList.length >= 5} className='disabled:opacity-30 rounded-xl border-black border-4 p-3 px-5 drop-shadow-sharp bg-white'>upload new</button>
                </div>
                {docList.length > 0 ? docList.map((item) => {
                    return (
                        <a href={`/documents/view/${item.id}`}>
                            <div className='w-full p-3 px-5 border-4 border-black rounded-xl drop-shadow-sharp bg-white flex items-center hover:bg-slate-200 mb-3'>
                                <BsFileEarmarkTextFill className='mr-3 text-xl' />
                                <p className='font-medium text-xl grow'>{item.title}</p>
                                <p className='font-medium text-xl'>{item.pages} pages</p>
                            </div>
                        </a>
                    )
                }): 
                <div className='w-full p-3 rounded-xl bg-slate-300 flex flex-col opacity-50 items-center justify-center py-5'>
                    <p className='text-xl font-bold '>No Documents Found</p>
                    <p className='text-sm '>To start scanning and learning from your documents, click the "upload new" button above.</p>
                </div>
                }
                
            </div>

        </div>
    )
}