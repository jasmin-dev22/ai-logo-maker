"use client"

import { Button } from "@/components/ui/button"
import { UserButton, useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

const Header = () => {
  const { user } = useUser()
  const router = useRouter()

  return (
    <div className="flex justify-between items-center px-10 lg:px-32 xl:px-49 2xl:px-56 p-4 shadow-sm">
      <img src={"/logo.svg"} alt="logo" width={100} height={100} />

      <div className="flex gap-3 items-center">
        {user ? (
          <Button onClick={() => router.push("/dashboard")}>Dashboard</Button>
        ) : (
          <Button onClick={() => router.push("/sign-up")}>Get Started</Button>
        )}

        <UserButton />
      </div>
    </div>
  )
}

export default Header
