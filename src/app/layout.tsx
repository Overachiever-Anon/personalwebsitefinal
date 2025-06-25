import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientHeader from '@/components/layout/ClientHeader';
import Footer from '@/components/layout/Footer';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Professional portfolio showcasing projects, code, research, gameplay clips, and blog posts.',
  keywords: ['portfolio', 'projects', 'code', 'research', 'blog', 'gameplay'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="flex min-h-screen flex-col">
          <ClientHeader />
                    <main className="flex-1 pt-20">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
