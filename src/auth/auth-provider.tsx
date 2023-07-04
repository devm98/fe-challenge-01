import axios from "axios";
import React, { useEffect } from "react";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "../helpers/localstorage";
import { fakeAuthProvider } from "./auth-services";

interface AuthContextType {
  user: any;
  signin: (user: any, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}

const AuthContext = React.createContext<AuthContextType>(null!);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<any>(null);

  const signin = (userInfo: any, callback: VoidFunction) => {
    return fakeAuthProvider.signin(async () => {
      localStorage.setItem("token", userInfo?.access_token);
      const userOwn = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `${userInfo.token_type} ${userInfo?.access_token}`,
          },
        }
      );
      setLocalStorageItem(
        "userInfo",
        userOwn.status === 200 ? userOwn.data : ""
      );
      setUser(userOwn.data);
      callback();
    });
  };

  const signout = (callback: VoidFunction) => {
    return fakeAuthProvider.signout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
      setUser(null);
      callback();
    });
  };

  useEffect(() => {
    const userInfo = getLocalStorageItem("userInfo");
    if (userInfo) {
      setUser(userInfo);
    }
  }, []);

  const value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext };
export default AuthProvider;
