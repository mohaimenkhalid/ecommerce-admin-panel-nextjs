"use client"

import './globals.css'
import {Inter} from 'next/font/google'
import {SessionProvider} from "next-auth/react"
import Layout from "@/app/components/layout";
import { Toaster } from 'react-hot-toast';

const inter = Inter({subsets: ['latin']})

export default function RootLayout({children, session}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <SessionProvider session={session}>
            <Layout>
                {children}
            </Layout>
            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />
        </SessionProvider>
        </body>
        </html>
    )
}
