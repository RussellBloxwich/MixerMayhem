import React from "react";
import "./LoadingBar.css";

const LoadingBar = ({
  currentTime,
  totalTime,
}: {
  currentTime: number;
  totalTime: number;
}) => {
  const currentPercentage = Math.round((currentTime * 100) / totalTime);
 
  
  return (
    <div className="time-bar">
      <div
        className="progress-bar"
        style={{ width: currentPercentage.toString() + "%" }}
      ></div>
    </div>
  );
};

export default LoadingBar;
