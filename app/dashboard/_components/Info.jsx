"use client"

import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { UserDetailContext } from "@/app/_context/UserDetailContext"
import { Button } from "@/components/ui/button"

const Info = () => {
  const { userDetail } = useContext(UserDetailContext)
  const router = useRouter()

  const [isClient, setIsClient] = useState(false)

  // This hook ensures code runs only on client
  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    // Until client is ready, don't render dynamic content
    return null
  }

  if (!userDetail) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <p className="text-xl text-gray-500 animate-pulse">
          Loading user data...
        </p>
      </div>
    )
  }

  return (
    <div className="mb-6">
      {/* Greeting */}
      <div className="font-bold text-primary text-3xl">
        <h2>Hello, {userDetail.name} 👋</h2>
      </div>

      {/* Dashboard Header */}
      <div className="flex justify-between items-center mt-6">
        <h2 className="font-bold text-2xl">Dashboard</h2>

        <Button
          onClick={() => router.push("/create")}
          className="bg-primary text-white"
        >
          + Create New Logo
        </Button>
      </div>
    </div>
  )
}

export default Info
