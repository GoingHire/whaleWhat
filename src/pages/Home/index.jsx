import React from "react";
import Header from "../../layout/Header";
import LeftContainer from "./LeftContainer";
import RightContainer from "./RightContainer";

function Home() {
  return (
    <>
      <Header />
      <div className="flex ">
        <LeftContainer className="px-10" />
        <RightContainer />
      </div>
    </>
  );
}

export default Home;
