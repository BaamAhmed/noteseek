"use client"

import {useState, useRef, useEffect} from 'react'
import Image from 'next/image'
import uploadImg from './upload.png'
import { useAuthContext } from '@/context/AuthContext'
import { uploadDocument, addDocumentToDB } from '@/firebase/document'
import { useRouter } from 'next/navigation'
import { LoadingScreen } from '@/app/partials'
import { toast } from 'react-toastify'
import { fetchDocList } from '@/firebase/document'


const arrToObj = (pageArr) => {
    let returnObj = {}
    pageArr.map((item, index) => {
        returnObj[index] = item
    })
    return returnObj
}


export default function Upload() {
    const [uploadedFile, setUploadedFile] = useState(null)
    const [loading, setLoading] = useState(false)

    const {user} = useAuthContext()
    console.log(user)
    const router = useRouter()

   
    if (user == null) {
        router.push('/login')
        // console.log('hello')
    } else if (!user.emailVerified) {
        router.push('/verify')
    }
        
 
    const handleUpload = async (event) => {
        const document = event.target.files[0]
        console.log(document)
        if (document.size < 1000000) {
            setLoading(true)
            toast.info("Document upload and scanning in progress...", {
                position: toast.POSITION.TOP_CENTER
            });
            console.log(document)
            const extracted = await uploadDocument(document, user.uid)
            // Make and upload a document item in the database
            // {
            //     userID: users uid,
            //     docURL: document url,
            //     pagesData: [richData]
            // }
            let richDocument = {
                userID: user.uid,
                docURL: extracted.docURL,
                title: extracted.docName,
                pagesData: arrToObj(extracted.richData),
                numPages: extracted.richData.length
            }
            const docID = await addDocumentToDB(richDocument)
            console.log('New document added to database')
            toast.success("Document uploaded and scanned successfully!", {
                position: toast.POSITION.TOP_CENTER
            });
            router.push(`/documents/view/${docID}`)
        } else {
            toast.error("Please upload a document of size less than 1MB.", {
                position: toast.POSITION.TOP_CENTER
            });
            router.push('/dashboard')
        }
    }

    return (
        <>
            {loading ?
            <LoadingScreen /> :
            <div className="min-h-screen px-36 flex justify-center items-center">
                <div className='flex flex-col items-center'>
                    <Image src={uploadImg} width={300} />
                    <h1 className='font-bold text-4xl mb-3'>upload document</h1>
                    <p className='w-2/5 text-center text-sm mb-5'>Upload your own notes for any subject to instantly fetch relevant resources from across the web. (Note: only PDF files accepted, max size: 1MB)</p>
                    <input type='file' accept='.pdf' onChange={handleUpload} className='font-bold rounded-xl border-black border-4 p-3 px-5 drop-shadow-sharp bg-white hover:bg-slate-200 mb-5'/>
                    <a className='text-sm underline' href="/dashboard">back to dashboard</a>
                </div>
            </div>}
        </>
    )
}