import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'IndiaMart ElasticStack Chat',
  description: 'AI-powered chat interface for Elasticsearch',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "h-screen w-full flex flex-col overflow-hidden")}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
