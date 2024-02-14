import { useState } from "react";

interface Error {
  emailErr: string;
  pwErr: string;
  pwCheckErr: string;
  userNameErr: string;
}

const useValid = (): Error => {
  const [error, setError] = useState<Error>({
    emailErr: "",
    pwErr: "",
    pwCheckErr: "",
    userNameErr: "",
  });

  const EmailValid = () => {};

  return error;
};

export default useValid;
