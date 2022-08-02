import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";


import {userReducer } from "reducers";

const userContext = createContext();
const useUser = () => useContext(userContext);

const UserProvider = ({ children }) => {
  const [userState, userDispatch] = useReducer(userReducer, {
    loading: false,
    isAuthenticated: false,
    user: null,
    error: null
  });

  //   functions

  
  return (
    <userContext.Provider value={{ userState }}>
      {children}
    </userContext.Provider>
  );
};
export { useUser, UserProvider };
