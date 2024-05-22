import React from "react";
import Header from "../../layout/Header";
import DropDown from "../../components/DropDown";

function Home() {
  return (
    <div>
      <Header />
      <div className="flex flex-col gap-4 pl-16">
        <DropDown options={["a", "b"]} />
        <div className="flex gap-4  text-lg">
          <button className="text-white hover:text-[#006EEB]">1D</button>
          <button className="text-white hover:text-[#006EEB]">1W</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
