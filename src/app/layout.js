import './globals.css'
import { Playfair_Display } from 'next/font/google'
import { AuthContextProvider } from '@/context/AuthContext'
import { Header } from './partials'

const playfairDisplay = Playfair_Display({subsets: ['latin'], variable: '--font-playfair_display'})

export const metadata = {
  title: 'noteseek',
  description: 'Fetch relevant resources automatically',
}


export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={`${playfairDisplay.className}`}>
        <AuthContextProvider>

          <Header />
          {children}
          <div className='min-w-screen p-3 px-36 flex justify-between items-center'>
            <div>
              <p className='font-bold text-4xl'>noteseek</p>
              <p className='text-md'>learning powered by your notes</p>
            </div>
            <div className='w-2/5 text-center'>
              <p>“some very inspirational quote here because otherwise the website has nothing to put here”</p>
            </div>
            <div className='flex flex-col'>
              <a href="/" className='font-bold text-right text-xl'>home</a>
              <a href="#" className='font-bold text-right text-xl'>about</a>
              <a href="login" className='font-bold text-right text-xl'>login</a>
            </div>
          </div>
          <p className='text-center text-sm mb-5'>Copyright Bassam Ahmed 2023-2024. All rights reserved.</p>
        </AuthContextProvider>
      </body>
    </html>
  )
}
