import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";


import {userReducer } from "reducers";
import { CLEAR_ERRORS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS } from "constants/userConstants";

const userContext = createContext();
const useUser = () => useContext(userContext);

const UserProvider = ({ children }) => {
  const [userState, userDispatch] = useReducer(userReducer, {
    loading: false,
    isAuthenticated: false,
    user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
    error: null
  });

  //   functions
  const login = async(userData) => {
    try{
      userDispatch({type: LOGIN_REQUEST})

      const {data} = await axios.post("/api/auth/login", userData)

      userDispatch({type: LOGIN_SUCCESS, payload: data.foundUser})

      localStorage.setItem("user", JSON.stringify({_id: data.foundUser._id, firstName: data.foundUser.firstName, lastName: data.foundUser.lastName, email: data.foundUser.email}))
      localStorage.setItem('token', JSON.stringify(data.encodedToken))

    }catch(error){
      userDispatch({type: LOGIN_FAIL, payload: error.response.data.errors[0]})
    }
  }
  const register = async(userData) => {
    console.log(userData)
    try{
      userDispatch({type: REGISTER_USER_REQUEST})

      const {data} = await axios.post("/api/auth/signup", userData)
      console.log(data)
      userDispatch({type: REGISTER_USER_SUCCESS, payload: data.createdUser})
      localStorage.setItem("user", JSON.stringify({_id: data.createdUser._id, firstName: data.createdUser.firstName, lastName: data.createdUser.lastName, email: data.createdUser.email}))
      localStorage.setItem('token', JSON.stringify(data.encodedToken))

    }catch(error){
      // userDispatch({type: LOGIN_FAIL, payload: error.response.data.errors[0]})
      console.log(error.response.data)
    }
  }

  const clearError = () => {
    userDispatch({type: CLEAR_ERRORS})
  }

  
  return (
    <userContext.Provider value={{ userState, login, register, clearError }}>
      {children}
    </userContext.Provider>
  );
};
export { useUser, UserProvider };
