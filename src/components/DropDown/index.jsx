import { useState } from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import down from "../../assets/downTri.svg";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DropDown({ options, onSelect }) {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleOptionClick = (option, index) => {
    setSelectedOption(option);
    onSelect(option, index);
  };

  return (
    <div>
      <div className="flex gap-20 text-white border w-fit px-5 py-3 rounded-lg border-white font-bold">
        <div className=" text-xl">BTC</div>
        <img src={down} />
      </div>
    </div>
  );
}
