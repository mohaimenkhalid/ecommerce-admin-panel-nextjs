"use client"

import {useSession} from "next-auth/react";

export default function Home() {
    const {data: session} = useSession()
    return (
        <>
            <div className="flex justify-between mt-2">
                <h1>Hello, {session?.user?.name}</h1>
                <div className="flex items-center gap-1">
                    <img src={session?.user?.image} width={30} height={30} className="rounded-full"  alt={'profile image'}/>
                    <h1>{session?.user?.name}</h1>
                </div>
            </div>
        </>

    )
}
