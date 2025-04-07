"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Lookup from "../_data/Lookup";
import Link from "next/link";

const Hero = () => {
  const [title, setTitle] = useState();
  return (
    <div className="flex items-center mt-24 flex-col gap-5">
      <h2 className="text-primary text-5xl text-center font-bold">
        {Lookup.HeroHeading}
      </h2>
      <h2 className="text-5xl text-center font-bold">
        {Lookup.HeroSubheading}
      </h2>
      <p className="text-gray-500 text-lg text-center">{Lookup.HeroDesc}</p>

      <div className="flex gap-6 w-full max-w-2xl mt-10">
        <input
          className="p-3 border w-full rounded-md shadow-md"
          type="text"
          placeholder={Lookup.InputTitlePlaceholder}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Link href={'/create?title='+title}>
          <Button className="w-full p-6">Get Started</Button>
        </Link>
      </div>
    </div>
  );
};
export default Hero;
