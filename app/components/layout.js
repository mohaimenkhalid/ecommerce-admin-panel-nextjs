"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import Navbar from "@/app/components/Navbar";

export default function Layout({children}) {
    const { data: session } = useSession()
    if (session) {
        return (
            <div className="bg-blue-900 w-screen h-screen flex">
                <Navbar />
                <div className="bg-white w-full p-2 m-2 ml-0 rounded-lg">
                    {/*Signed in as {session.user.email} <br />*/}
                    {/*<button onClick={() => signOut()}>Sign out</button>*/}
                    {children}
                </div>
            </div>
        )
    }
    return (
        <div className="bg-blue-900 w-screen h-screen flex items-center justify-center">
            <button
                onClick={() => signIn('google')}
                className="bg-white p-2 px-3 font-bold rounded-lg">Login with Google</button>
        </div>
    )
}
