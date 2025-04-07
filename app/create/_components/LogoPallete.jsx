"use client"

import Lookup from "@/app/_data/Lookup";
import HeadingDescription from "./HeadingDescription";
import Colors from "@/app/_data/Colors";
import { useState } from "react";

const LogoPallete = ({onHandleInputChange,formData}) => {
  const [selectedOptions, setSelectedOptions] = useState(formData?.pallete);

  return (
    <div className="my-10">
      <HeadingDescription
        title={Lookup.LogoColorPaletteTitle}
        description={Lookup.LogoColorPaletteDesc}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-5">
        {Colors.map((pallete, index) => (
          <div
            key={index}
            className={`flex p-1 cursor-pointer ${
              selectedOptions == pallete.name &&
              "border-2 rounded-lg border-primary"
            }`}
          >
            {pallete?.colors.map((color, index) => (
              <div
                key={index}
                style={{ backgroundColor: color }}
                className="h-24 w-full"
                onClick={() => {setSelectedOptions(pallete.name);
                  onHandleInputChange(pallete.name)
                }}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
export default LogoPallete;
