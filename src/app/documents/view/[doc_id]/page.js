"use client"
import { useState, useEffect } from 'react'
import { IoArrowBack } from 'react-icons/io5'
import { FaChevronLeft, FaChevronRight, FaChevronDown, FaChevronUp } from "react-icons/fa"
import { fetchDocument } from '@/firebase/document'
import { useRouter } from 'next/navigation'
import { useAuthContext } from '@/context/AuthContext'
import Pdf from './document'

export default function Document({params}) {
    const {user} = useAuthContext()
    const router = useRouter()
    const [openSection, setOpenSection] = useState(-1)
    const [fileURL, setFileURL] = useState('')
    const [pagesData, setPagesData] = useState([])
    const [filename, setFilename] = useState('')
    const [currPage, setCurrPage] = useState(0)
    const [numPages, setNumPages] = useState(0)

    const docID = params.doc_id

    


    useEffect(() => {
        if (user == null) {
            router.push('/login')
        } else if (!user.emailVerified) {
            router.push('/verify')
        }
        const populatePage = async () => {
            // get data from firestore about this document using the given docID
            const fetchedData = await fetchDocument(docID)
            console.log(fetchedData)
            setFilename(fetchedData.title)
            setFileURL(fetchedData.docURL)
            setPagesData(fetchedData.pagesData)
            setNumPages(fetchedData.numPages)
        }
        populatePage()
    }, [])

    const handlePageUp = () => {
        if (pagesData) {
            if (currPage < numPages - 1) {
                setCurrPage(currPage + 1)
            }
        }
    }

    const handlePageDown = () => {
        if (pagesData) {
            if (currPage > 0) {
                setCurrPage(currPage - 1)
            }
        }
    }

    const sampleIdeas = [
        {
            phrase: 'there are logical operators and quantifiers',
            resources: [
                {
                    title: 'Introduction to Linear Algebra',
                    URL: 'https://www.youtube.com/watch?v=fNk_zzaMoSs&list=PLZHQObOWTQDPD3Mizzwefdwedfcrg'
                },
                {
                    title: 'Universally Quantified Statements',
                    URL: 'https://www.youtube.com/watch?v=fNk_zzaMoSs&list=PLZHQObOWTQDPD3Mizzwefdwedfcrg'
                },
                {
                    title: 'First Year Uni Math',
                    URL: 'https://www.youtube.com/watch?v=fNk_zzaMoSs&list=PLZHQObOWTQDPD3Mizzwefdwedfcrg'
                },
            ]
        },
        {
            phrase: 'mathematical statements have truth values',
            resources: [
                {
                    title: 'Truth Statements',
                    URL: 'https://www.youtube.com/watch?v=fNk_zzaMoSs&list=PLZHQObOWTQDPD3Mizzwefdwedfcrg'
                },
                {
                    title: 'Mathematical Statements',
                    URL: 'https://www.youtube.com/watch?v=fNk_zzaMoSs&list=PLZHQObOWTQDPD3Mizzwefdwedfcrg'
                },
                {
                    title: 'Linear Algebra',
                    URL: 'https://www.youtube.com/watch?v=fNk_zzaMoSs&list=PLZHQObOWTQDPD3Mizzwefdwedfcrg'
                },
            ]
        },
        {
            phrase: 'proof of mathematical statements',
            resources: [
                {
                    title: 'Proofs in Math',
                    URL: 'https://www.youtube.com/watch?v=fNk_zzaMoSs&list=PLZHQObOWTQDPD3Mizzwefdwedfcrg'
                },
                {
                    title: 'Mathematical Statements',
                    URL: 'https://www.youtube.com/watch?v=fNk_zzaMoSs&list=PLZHQObOWTQDPD3Mizzwefdwedfcrg'
                },
                {
                    title: 'Advanced Math',
                    URL: 'https://www.youtube.com/watch?v=fNk_zzaMoSs&list=PLZHQObOWTQDPD3Mizzwefdwedfcrg'
                },
            ]
        },
    ]
    return (
        <div className="min-h-screen px-36 pt-16">
            <a href='/dashboard' className='flex items-center hover:font-bold mb-5'>
                <IoArrowBack className='mr-3' />
                <p className='hover:font-bold'>back to dashboard</p>
            </a>
            <div className="w-full grid grid-cols-5">
                <div className='col-span-2 p-3'>
                    {/* <div style={{height: 600}} className='border-black border-4 rounded-xl bg-slate-300 drop-shadow-sharp'>

                    </div> */}
                    {/* <embed
                    toolbar={false}
                    style={{
                            width: '100%',
                            height: 700
                            
                        }}
                        type='application/pdf'
                        src={fileURL}
                    /> */}
                    <div className='border-black border-4 rounded-xl bg-white drop-shadow-sharp p-1'>
                        <Pdf pageNum={currPage} docURL={fileURL} />
                    </div>
                </div>
                <div className='col-span-3 p-5'>
                    <div className='border-black border-4 rounded-xl drop-shadow-sharp bg-white p-3 mb-5'>
                        <div className='flex mb-3'>
                            <p className='opacity-50 font-bold mr-5'>filename:</p>
                            <p className='font-bold'>{filename}</p>
                        </div>
                        <div className='flex justify-between items-center'>
                            <button onClick={handlePageDown}>
                                <FaChevronLeft />
                            </button>
                            <p className='font-bold text-lg'>page {currPage + 1}/{numPages}</p>
                            <button onClick={handlePageUp}>
                                <FaChevronRight />
                            </button>
                        </div>
                    </div>
                    <h4 className='font-bold text-2xl mb-3'>extracted ideas</h4>
                    {pagesData[currPage] && pagesData[currPage].map((item, index) => 
                        <div className='border-black border-4 rounded-xl drop-shadow-sharp bg-white p-3 px-5 mb-5'>
                            <div className="flex justify-between">
                                <p>"...{item.phrase}..."</p>
                                <button onClick={() => {
                                        if (index == openSection) {
                                            setOpenSection(-1)
                                        } else {
                                            setOpenSection(index)
                                        }
                                    }}>
                                    {index == openSection ? <FaChevronUp /> : <FaChevronDown />}
                                </button>
                            </div>
                            {index == openSection ?
                                <div className='mt-3'>
                                    {item.results.map((resource, resourceIndex) => {
                                        return (
                                            <a className='hover:bg-slate-200 rounded-xl' href={resource.url}>
                                                {resourceIndex != 0 && <hr />}
                                                <h4 className='font-bold text-lg mt-3'>{resource.title}</h4>
                                                <p>{resource.desc}</p>
                                                <p className='text-sm opacity-50 mb-3'>{resource.url}</p>
                                            </a>
                                        )
                                    })}
                                </div>
                            : null}
                        </div>
                    )}
                    
                </div>
            </div>
        </div>
    )
}