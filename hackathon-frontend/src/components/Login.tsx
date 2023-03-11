import React, { useState } from "react";
// import "./login.css";
import generateName from "./GenerateGroupName";

const Login = ({
  setUserName,
}: {
  setUserName: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [value, setValue] = useState("");

  const createName = () => {
    return generateName(8);
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onSubmit = () => {
    setUserName(value);
  };

  return (
    <div className="container">
      <img className="logo" src="./logo.png" alt="Mixer Mayhem"/>
      <h1 className="title">{createName()}</h1>
      <input placeholder="Name" onChange={(e) => onChange(e)} value={value} />
      <input
        type={"submit"}
        onClick={() => {
          onSubmit();
        }}
      />
    </div>
  );
};

export default Login;
