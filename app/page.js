"use client"

import { useSession, signIn, signOut } from "next-auth/react"


export default function Home() {
    const { data: session } = useSession()
    if (session) {
        return (
            <>
                Signed in as {session.user.email} <br />
                <button onClick={() => signOut()}>Sign out</button>
            </>
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
