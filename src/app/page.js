"use client"
import Image from 'next/image'
import jumbotronMain from './jumbotron_main.png'

export default function Home() {
  return (
    <main className="flex min-h-screen px-36 flex-col justify-between mb-36">
      <div className='min-h-screen grid grid-cols-2 items-center'>
        <div className='flex flex-col justify-center'>
          <p className='text-5xl font-bold mb-5'>fetch resources instantly</p>
          <p className='text-md mb-8'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo.</p>
          <a className='bg-white border-black drop-shadow-sharp border-4 rounded-xl p-2 px-6 self-start text-lg' href="login">upload a note</a>
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
        <div className='bg-white border-4 border-black drop-shadow-sharp rounded-2xl p-5'>
          <h4 className='text-2xl font-bold mb-3'>step 1</h4>
          <p className='mb-6'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque.</p>
          <div className='flex justify-center w-full'>
            <Image 
              src={jumbotronMain}
              className='justify-center'
              width={100}
              height={100}
            />

          </div>
        </div>
        <div className='bg-white border-4 border-black drop-shadow-sharp rounded-2xl p-5'>
          <h4 className='text-2xl font-bold mb-3'>step 2</h4>
          <p className='mb-6'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque.</p>
          <div className='flex justify-center w-full'>
            <Image 
              src={jumbotronMain}
              className='justify-center'
              width={100}
              height={100}
            />

          </div>
        </div>
        <div className='bg-white border-4 border-black drop-shadow-sharp rounded-2xl p-5'>
          <h4 className='text-2xl font-bold mb-3'>step 3</h4>
          <p className='mb-6'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque.</p>
          <div className='flex justify-center w-full'>
            <Image 
              src={jumbotronMain}
              className='justify-center'
              width={100}
              height={100}
            />

          </div>
        </div>
        
      </div>
    </main>
  )
}
