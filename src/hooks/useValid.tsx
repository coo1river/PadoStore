import { ReqData } from "@/api/joinApi";
import { useState } from "react";

interface Error {
  emailErr: string;
  pwErr: string;
  pwCheckErr: string;
  userNameErr: string;
}

const useValid = (form: ReqData): Error => {
  const [error, setError] = useState<Error>({
    emailErr: "",
    pwErr: "",
    pwCheckErr: "",
    userNameErr: "",
  });

  const EmailValid = () => {
    if (!form.email) {
    }
  };

  return error;
};

export default useValid;
