
import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [balance, setBalance] = useState(0);

  const value = {
    balance,
    setBalance,
  };


  const MockCharacter =  {
    name: "Bob",
    status: {
      balance: 0,
    },
    career: {
      job: "mover",
      salary: 20
    }
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
