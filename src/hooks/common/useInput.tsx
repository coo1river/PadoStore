import React, { useState } from "react";

const useInput = (input: string) => {
  const [value, setValue] = useState(input);
  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setValue(e.target.value);
  };

  return { value, onChange, setValue };
};

export default useInput;
