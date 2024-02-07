// TaskContext.js
import React, { createContext, useContext, useReducer } from 'react';

const GlobalContext = createContext();

const initialState = {
    menuItems: [],
  };
  
  const reducer = (state, action) => {
    switch (action.type) {
      case 'setMenuItems':
        return {
          ...state,
          menuItems: action.payload
        };
      default:
        return state;
    }
  };
  

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);