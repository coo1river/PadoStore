import React, { useState } from "react";

const useInput = (input: string) => {
  const [value, setValue] = useState(input);
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(e.target.value);
  };

  const clear = () => {
    setValue("");
  };

  return { value, onChange, clear };
};

export default useInput;
