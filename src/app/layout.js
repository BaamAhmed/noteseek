import './globals.css'
import { Playfair_Display } from 'next/font/google'
import { AuthContextProvider } from '@/context/AuthContext'
import { Header, Footer } from './partials'


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
          <Footer />
          <p className='text-center text-sm mb-5'>Copyright Bassam Ahmed 2023-2024. All rights reserved. Version 0.0.1</p>
        </AuthContextProvider>
      </body>
    </html>
  )
}
