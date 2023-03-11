import React, { useState } from "react";

const Login = ({
  setUserName,
}: {
  setUserName: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [value, setValue] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onSubmit = () => {
    setUserName(value);
  };

  return (
    <div>
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
