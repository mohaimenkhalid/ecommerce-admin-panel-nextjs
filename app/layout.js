"use client"

import './globals.css'
import {Inter} from 'next/font/google'
import {SessionProvider} from "next-auth/react"
import Layout from "@/app/components/layout";

const inter = Inter({subsets: ['latin']})

export default function RootLayout({children, session}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <SessionProvider session={session}>
            <Layout>
                {children}
            </Layout>
        </SessionProvider>
        </body>
        </html>
    )
}
