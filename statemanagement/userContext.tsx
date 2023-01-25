import { useState, createContext, useRef } from "react";
import { typeProps,contextStates } from "../utils/types";
export const UserContext = createContext<contextStates>({} as contextStates);
export const UserProvider = (props:typeProps) => {
//   const [user, setUser] = useState<contextStates["user"]>(null);
  const [user, setUser] = useState<string|null>(null);
  const state:contextStates = {
    user: user,
    setUser: setUser
  }
  return (
    <UserContext.Provider value={state}>
      {props.children}
    </UserContext.Provider>
  );
};
