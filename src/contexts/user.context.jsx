import { createContext, useEffect, useState, useReducer } from "react";

import { onAuthStateChangedListener } from "../utils/firebase/firebase.utils";
import { createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

//actual value/s you want to access globally
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

///////////////////Using Reducers
//Reducers still use a context its only the way in which the data gets updated that is different

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return { ...state, currentUser: payload };
    default:
      throw new Error(`Unhandled type ${type} in the userReducer`);
  }
};

const INITIAL_STATE = {
  currentUser: null,
};

//provider (provides access to the userContext): is the actual component, wraps the children
export const UserProvider = ({ children }) => {
  //Context way
  // const [currentUser, setCurrentUser] = useState(null);

  //Reducer way
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);
  const { currentUser } = state;
  const setCurrentUser = (user) => {
    dispatch({ payload: user, type: USER_ACTION_TYPES.SET_CURRENT_USER });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const value = { currentUser, setCurrentUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
