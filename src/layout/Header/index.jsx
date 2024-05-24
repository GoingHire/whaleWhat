import React from "react";
import logo from "../../assets/logo.svg";

function Header() {
  return (
    <div className="flex gap-5 justify-between px-10 py-6 w-full text-lg leading-7 text-center text-gray-500 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
      <img src={logo} className="w-80" alt="Logo" />
    </div>
  );
}

export default Header;
