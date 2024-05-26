import { useState } from "react";
import { Fragment } from "react";
import { Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import down from "../../assets/Arrow_drop_down.svg";
import up from "../../assets/Arrow_drop_up.svg";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DropDown({ options, onSelect }) {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleOptionClick = (option, index) => {
    setSelectedOption(option);
    onSelect(option, index);
  };

  return (
    <div
      className="`transition-opacity w-fit hover:cursor-pointer relative"
      onClick={() => setOpen(!open)}
    >
      <div className="flex gap-20 text-white border w-fit px-5 py-3 rounded-lg border-white font-bold">
        <div className=" text-xl">{selectedOption}</div>
        {open ? <img src={up} /> : <img src={down} alt="Dropdown Icon" />}
      </div>

      <div
        className={`bg-white text-black z-10 absolute w-full  ${
          open ? "grid" : "hidden"
        }`}
      >
        {options.map((option, index) => (
          <div
            key={index}
            onClick={() => handleOptionClick(option, index)}
            className="text-black text-start"
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
}
