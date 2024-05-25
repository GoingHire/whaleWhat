import React, { useState } from "react";
import Header from "../../layout/Header";
import DropDown from "../../components/DropDown";

function Home() {
  const [select, onSelect] = useState();
  const onClickHandler = () => {
    console.log("clicked");
  };
  console.log(select);
  return (
    <div>
      <Header />
      <div className="flex gap-4 pl-28 pt-4 justify-between">
        <div className="flex flex-col gap-4  ">
          <DropDown options={["a", "b"]} onSelect={onSelect} />
          <div
            className="flex gap-4 text-lg font"
            onClick={() => onClickHandler}
          >
            <button className="text-white hover:text-[#006EEB]">1M</button>
            <button className="text-white hover:text-[#006EEB]">1D</button>
          </div>
        </div>
        <div className="flex">
          <div className="text-white font-bold text-3xl font">모의 투자</div>
        </div>
      </div>
    </div>
  );
}

export default Home;
