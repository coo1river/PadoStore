import React, { useState } from "react";

const useInput = (input: string) => {
  const [value, setValue] = useState(input);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return { value, onChange };
};

export default useInput;
