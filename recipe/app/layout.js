import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Recipe Matchmaker!',
  description: "Welcome to the Recipe Matchmaker! This wonderful tool helps you find the perfect recipes tailored to your individual needs from almost 200 thousand options!",
}


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head><meta name="google-site-verification" content="jlicd6sbcySfLloTEJxLX_fTHKrioeLPJv2kxs3eF88" /></head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
