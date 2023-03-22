import { createContext, useContext, useState } from "react";
import { UserInterface } from "../interfaces/user.interface";

const Context = createContext<UserInterface>({});

export const useUser = () => {
  return useContext(Context);
};

const UserContext: React.FC<{ user: UserInterface; children: JSX.Element }> = ({
  children,
  user,
}) => {
  return <Context.Provider value={user}>{children}</Context.Provider>;
};

export default UserContext;
