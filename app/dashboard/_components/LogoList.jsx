"use client"

import { UserDetailContext } from "@/app/_context/UserDetailContext"
import { db } from "@/configs/FirebaseConfig"
import { collection, getDocs } from "firebase/firestore"
import Image from "next/image"
import { useContext, useEffect, useState } from "react"

const LogoList = () => {
  const { userDetail } = useContext(UserDetailContext)
  const [logoList, setLogoList] = useState([])

  useEffect(() => {
    userDetail && getUserLogos()
  }, [userDetail])

  const getUserLogos = async () => {
    const querySnapshot = await getDocs(
      collection(db, "users", userDetail?.email, "logos")
    )
    setLogoList([])
    querySnapshot.forEach((doc) => {
      setLogoList((prev) => [...prev, doc.data()])
    })
  }

  // Function to download Image in high quality
  const downloadLogo = (imageUrl) => {
    const link = document.createElement("a")
    link.href = imageUrl
    link.download = "my-logo.png" // file name for download
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {logoList?.length > 0
          ? logoList.map((logo, index) => (
              <div
                key={index}
                className="group bg-white p-2 rounded-xl shadow hover:scale-105 transition-all cursor-pointer"
              >
                <Image
                  src={logo?.image}
                  alt={logo?.title}
                  width={400}
                  height={200}
                  className="w-full h-[200px] object-cover rounded-lg"
                />

                <h2 className="text-center text-lg font-semibold mt-2">
                  {logo?.title}
                </h2>

                <p className="text-sm text-gray-500 text-center">
                  {logo?.desc}
                </p>

                <button
                  onClick={() => downloadLogo(logo?.image)}
                  className="w-full mt-2 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-all"
                >
                  Download Logo
                </button>
              </div>
            ))
          : [1, 2, 3, 4, 5, 6].map((item, index) => (
              <div
                key={index}
                className="bg-slate-200 animate-pulse rounded-xl w-full h-[250px]"
              ></div>
            ))}
      </div>
    </div>
  )
}

export default LogoList
