"use client";

import { useContext, useEffect, useState } from "react";
import { UserDetailContext } from "../_context/UserDetailContext";
import Promt from "../_data/Promt";
import axios from "axios";
import Image from "next/image";
import Lookup from "../_data/Lookup";
import { LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const Page = () => {
  const { userDetail } = useContext(UserDetailContext);
  const [formData, setFormData] = useState();
  const [loading, setLoading] = useState(false);
  const [logoImage, setLogoImage] = useState();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && userDetail?.email) {
      const storage = localStorage.getItem("formData");
      const generatedLogo = localStorage.getItem("generatedLogo");

      if (storage) {
        setFormData(JSON.parse(storage));
      }

      if (generatedLogo) {
        setLogoImage(generatedLogo); // show already generated image
      }
    }
  }, [userDetail]);

  const handleGenerateLogo = async () => {
    setLoading(true);

    const storage = localStorage.getItem("formData");
    let latestFormData = formData;
    if (storage) {
      latestFormData = JSON.parse(storage);
      setFormData(latestFormData);
    }

    const PROMPT = Promt.LOGO_PROMPT.replace("{logoTitle}", latestFormData?.title)
      .replace("{logoDesc}", latestFormData?.desc)
      .replace("{logoColor}", latestFormData?.pallete)
      .replace("{logoIdea}", latestFormData?.idea)
      .replace("{logoDesign}", latestFormData?.design?.title)
      .replace("{logoPrompt}", latestFormData?.design?.prompt);

    const result = await axios.post("/api/ai-logo-model", {
      prompt: PROMPT,
      email: userDetail?.email,
      title: latestFormData?.title,
      desc: latestFormData?.desc,
    });

    setLogoImage(result.data?.image);
    localStorage.setItem("generatedLogo", result.data?.image); // save in localStorage
    setLoading(false);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = logoImage;
    link.download = "ai-logo.png";
    link.click();
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-6">

      <h2 className="font-bold text-3xl text-primary animate-pulse text-center">
        {loading ? Lookup.LoadingWaitTitle : "Your AI Generated Logo"}
      </h2>

      <p className="text-xl text-gray-500 text-center max-w-md">
        {loading ? Lookup.LoadingWaitDesc : "Get a unique AI powered logo based on your input!"}
      </p>

      {loading && (
        <div className="flex flex-col items-center gap-4">
          <LoaderIcon className="animate-spin text-primary w-8 h-8" />
          <Image src="/loading.gif" alt="loading" height={150} width={150} className="opacity-80" />
          <h2 className="text-lg font-medium text-gray-600 animate-pulse">
            Generating your Logo...
          </h2>
        </div>
      )}

      {!loading && logoImage && (
        <>
          <Image
            src={logoImage}
            alt="Generated Logo"
            width={250}
            height={250}
            className="rounded-xl shadow-lg transition-all duration-500 hover:scale-105"
          />

          <div className="flex flex-wrap gap-4 mt-4">
            <button
              onClick={handleDownload}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
            >
              Download
            </button>

            <button
              onClick={() => router.push("/dashboard")}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
            >
              Go To Dashboard
            </button>
          </div>
        </>
      )}

      {!loading && !logoImage && (
        <button
          onClick={handleGenerateLogo}
          disabled={loading}
          className={`mt-4 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-primary text-white hover:bg-primary/90"
          }`}
        >
          {loading ? "Generating..." : "Generate Logo"}
        </button>
      )}
    </div>
  );
};

export default Page;
