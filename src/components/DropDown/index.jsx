import { useState } from "react";
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
        <div className=" text-xl">{selectedOption}</div>
        <img src={down} alt="Dropdown Icon" />
      </div>
      <div className="dropdown-content">
        {options.map((option, index) => (
          <div
            key={index}
            className="dropdown-item"
            onClick={() => handleOptionClick(option, index)}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
}
