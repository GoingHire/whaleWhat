import { useState } from "react";

function BtnContainer({ options, className, btnHandler }) {
  const [selected, setSelected] = useState("");

  return (
    <>
      {options.length != 0 &&
        options.map((option, index) => {
          return (
            <button
              key={index}
              className={` ${className} ${
                selected === option ? "text-[#006EEB]" : "text-white"
              }`}
              onClick={() => btnHandler(option)}
            >
              {option}
            </button>
          );
        })}
    </>
  );
}

export default BtnContainer;
