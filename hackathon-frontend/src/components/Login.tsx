import React, { useState } from "react";

import "./Login.css";
import generateName from "./generateName";

const Login = ({
  setUserName,
}: {
  setUserName: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [value, setValue] = useState("");

  const createName = () => {
    return generateName(8);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onSubmit = () => {
    setUserName(value);
  };

  return (
    <div className="container">
      <img className="logo" src="./logo-cropped.png" alt="Mixer Mayhem"/>
      <h1 className="title">{createName()}</h1>
      <input placeholder="Name" onChange={(e) => onChange(e)} value={value} />
      <input className="button"
        type={"submit"}
        onClick={() => {
          onSubmit();
        }}
      />
    </div>
  );
};

export default Login;
