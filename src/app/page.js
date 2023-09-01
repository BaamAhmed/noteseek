"use client"
import Image from 'next/image'
import jumbotronMain from './jumbotron_main.png'
import step1 from './step_1.png'
import step2 from './step_2.png'
import step3 from './step_3.png'
import { useKeywordSearch } from '@/firebase/functions'

export default function Home() {


  return (
    <main className="flex min-h-screen px-36 flex-col justify-between mb-36">
      <div className='min-h-screen grid grid-cols-2 items-center'>
        <div className='flex flex-col justify-center'>
          <p className='text-5xl font-bold mb-5'>fetch resources instantly</p>
          <p className='text-md mb-8'>With NoteSeek, you can effortlessly upload your documents and instantly access a wealth of relevant online resources tied to the key ideas within your content. Say goodbye to time-consuming searches and hello to streamlined, insightful research.</p>
          <a className='bg-white border-black drop-shadow-sharp border-4 rounded-xl p-2 px-6 self-start text-lg' href="/documents/upload">upload a note</a>
          
        </div>
        <div className='flex flex-row-reverse'>
          <Image 
            src={jumbotronMain}
            width={500}
            height={500}
          />
        </div>
      </div>
      <div className='grid grid-cols-3 gap-5 mb-24'>
        <div className='bg-white border-4 border-black drop-shadow-sharp rounded-2xl p-5 flex flex-col justify-between'>
          <div>
            <h4 className='text-2xl font-bold mb-3'>1. extract relevant pages</h4>
            <p className='mb-6'>Before uploading a document, make sure to extract only relevant pages to maximise the effectiveness of NoteSeek.</p>
          </div>
          <div className='flex justify-center w-full'>
            <Image 
              src={step1}
              className='justify-center'
              width={400}
              height={100}
            />

          </div>
        </div>
        <div className='bg-white border-4 border-black drop-shadow-sharp rounded-2xl p-5 flex flex-col justify-between '>
          <div>
            <h4 className='text-2xl font-bold mb-3'>2. upload document</h4>
            <p className='mb-6'>Upload your document to NoteSeek to allow keyword extracting and lookip to take place.</p>
          </div>
          <div className='flex justify-center w-full'>
            <Image 
              src={step2}
              className='justify-center'
              width={400}
              height={100}
            />

          </div>
        </div>
        <div className='bg-white border-4 border-black drop-shadow-sharp rounded-2xl p-5 flex flex-col justify-between'>
          <div>
            <h4 className='text-2xl font-bold mb-3'>3. browse links</h4>
            <p className='mb-6'>Enjoy the extracted links and get learning!</p>
          </div>
          <div className='flex justify-center w-full'>
            <Image 
              src={step3}
              className='justify-center'
              width={400}
              height={100}
            />

          </div>
        </div>
        
      </div>
    </main>
  )
}
