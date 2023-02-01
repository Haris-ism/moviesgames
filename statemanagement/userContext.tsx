import { useState, createContext, useRef } from "react";
import { typeProps,contextStates } from "../utils/types";
export const UserContext = createContext<contextStates>({} as contextStates);
export const UserProvider = (props:typeProps) => {
  const [user, setUser] = useState<string|null>(null);
  const [token, setToken] = useState<string|null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const state:contextStates = {
    user: user,
    setUser: setUser,
    token:token,
    setToken:setToken,
    loading:loading,
    setLoading:setLoading
  }
  return (
    <UserContext.Provider value={state}>
      {props.children}
    </UserContext.Provider>
  );
};
