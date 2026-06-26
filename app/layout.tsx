import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'  // ← Pastikan ini ada!
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { VisitorBadge } from './components/ui/VisitorBadge'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Udara yang Sama - Edukasi Kesehatan Campak',
  description: 'Platform edukasi kesehatan berbasis AI untuk meningkatkan kesadaran tentang penyakit campak',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen pt-16">{children}</main>
        <VisitorBadge />
        <Footer />
      </body>
    </html>
  )
}