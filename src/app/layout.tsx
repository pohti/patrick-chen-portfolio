import type { Metadata } from 'next'
import Link from 'next/link'
import { ReactNode } from 'react'

import './globals.css'

export const metadata: Metadata = {
  title: 'UI Showcase',
  description: 'Showcasing common UI components with React and Next.js',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen font-sans bg-gray-50 text-gray-900">
        {/* Top Navbar */}
        <header>
          <nav>
            <h1>{"Welcome to Patrick's UI Playground"}</h1>
            <div className="nav-link-container">
              <Link href="/">Home</Link>
              <Link href="/fintech">Fintech</Link>
              <Link href="/ecommerce">E-commerce</Link>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main>
          {children}
        </main>

        {/* Footer */}
        <footer>
          © {new Date().getFullYear()} UI Showcase — Built with Next.js
        </footer>
      </body>
    </html>
  )
}
