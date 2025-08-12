import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = React.createContext();

// =================================================================

const AuthProvider = (props) => {
  const history = useNavigate();
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isLoggedIn, setIsLoggedIn] = useState(token ? true : false);

  // =================================================================

  const saveToken = (token, id) => {
    setToken(token);
    setIsLoggedIn(true);
    setUserId(id);
  };

  // =================================================================

  const logout = () => {
    setToken("");
    setIsLoggedIn(false);
    localStorage.clear();
    history("/login");
  };

  // =================================================================

  useEffect(() => {
    if (isLoggedIn) {
      history("/dashboard");
    }
  }, [isLoggedIn]);

  // =================================================================

  const state = {
    token,
    isLoggedIn,
    userId,
    logout,
    saveToken,
    setIsLoggedIn,
  };
  // =================================================================

  return (
    <AuthContext.Provider value={state}>{props.children}</AuthContext.Provider>
  );
};

export default AuthProvider;
