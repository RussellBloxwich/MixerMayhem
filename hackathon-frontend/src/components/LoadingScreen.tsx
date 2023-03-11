import React from "react";
import "./LoadingScreen.css";
import { Bars } from "react-loader-spinner";

const LoadingScreen = ({ username }: { username: string }) => {
  return (
    <div className="loading-screen">
      <div className="loading-message">
        <div className="">Waiting for round to start.</div>
        <div className="">Welcome {username}.</div>
      </div>
      <Bars
        height="80"
        width="80"
        color="#008cba"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default LoadingScreen;
