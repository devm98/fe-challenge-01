import React from "react";
import { AuthContext } from "./auth-provider";

const useAuth = () => {
  return React.useContext(AuthContext);
};

export default useAuth;
