import React from "react";
import { selectIsLoggedIn } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";

export const ShowOnLogin = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const userLoggedIn = isLoggedIn ? children : null;

  return userLoggedIn;
};

export const ShowOnLogOut = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const userLoggedOut = !isLoggedIn ? children : null;

  return userLoggedOut;
};
