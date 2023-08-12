"use client";

import { useState } from "react";
import AuthContext from "./auth-context";

let userInfo = null;

if (typeof window !== "undefined") {
  userInfo = JSON.parse(localStorage.getItem("userInfo"));

  if (userInfo) {
    const tokenExpirationDate = userInfo.tokenExpirationDate;
    const currentDate = new Date(Date.now()).toISOString();
    
    if (currentDate > tokenExpirationDate) {
      localStorage.removeItem("userInfo");
      userInfo = null;
    }
  }
}

const AuthProvider = (props) => {
  const [user, setUser] = useState(userInfo);

  const login = (user) => {
    const { userId, name, email, token } = user;

    if (!userId || !email || !token) {
      return;
    }

    const tokenExpirationDate = new Date(
      new Date().getTime() + 7 * 24 * 60 * 60 * 1000
    );

    const userInfo = {
      isAuthenticated: true,
      userId,
      name,
      email,
      token,
      tokenExpirationDate: tokenExpirationDate.toISOString(),
    };

    localStorage.setItem("userInfo", JSON.stringify(userInfo));

    setUser({ ...userInfo });
  };

  const signup = (user) => {
    const { userId, name, email, token } = user;

    if (!userId || !email || !token) {
      return;
    }

    const tokenExpirationDate = new Date(
      new Date().getTime() + 7 * 24 * 60 * 60 * 1000
    );

    const userInfo = {
      isAuthenticated: true,
      userId,
      name,
      email,
      token,
      tokenExpirationDate: tokenExpirationDate.toISOString(),
    };

    localStorage.setItem("userInfo", JSON.stringify(userInfo));

    setUser({ ...userInfo });
  };

  const logout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
  };

  // useEffect(() => {
  //   let user = JSON.parse(localStorage.getItem("userInfo"));

  //   // console.log(user);

  //   if (!user) {
  //     return;
  //   }

  //   const tokenExpirationDate = user.tokenExpirationDate;
  //   const currentDate = new Date(Date.now()).toISOString();
  //   if (currentDate > tokenExpirationDate) {
  //     user = null;
  //     localStorage.removeItem("userInfo");
  //     return;
  //   }

  //   setUser({ ...user });
  // }, []);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
