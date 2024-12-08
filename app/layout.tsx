import './globals.css'
import { Inter, Poppins, Montserrat } from 'next/font/google'
import { LayoutWrapper } from '@/components/layout-wrapper'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
})

const montserrat = Montserrat({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata = {
  title: 'Jot - Time is Money',
  description: 'Maximize your productivity with Jot',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} ${montserrat.variable}`}>
      <LayoutWrapper className={inter.className}>
        {children}
      </LayoutWrapper>
    </html>
  )
}

