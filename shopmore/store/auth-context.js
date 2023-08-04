"use client";

import { createContext } from "react";

const AuthContext = createContext({
  user: {},
  login: (user) => {},
  signup: (user) => {},
  logout: () => {},
});

export default AuthContext;
