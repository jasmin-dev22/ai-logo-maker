"use client"

import Lookup from "@/app/_data/Lookup";
import HeadingDescription from "./HeadingDescription";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const LogoTitle = ({ onHandleInputChange }) => {
  const searchParam = useSearchParams();
  const [title, setTitle] = useState("");

  useEffect(() => {
    const titleFromParam = searchParam?.get('title');
    if (titleFromParam) {
      setTitle(titleFromParam);
      onHandleInputChange(titleFromParam);
    }
  }, [searchParam]);

  return (
    <div className="my-10">
      <HeadingDescription
        title={Lookup.LogoTitle}
        description={Lookup.LogoTitleDesc}
      />

      <input
        type="text"
        placeholder={Lookup.InputTitlePlaceholder}
        className="p-4 border rounded-lg mt-5 w-full"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          onHandleInputChange(e.target.value);
        }}
      />
    </div>
  );
};

export default LogoTitle;
