import { useState, ReactNode } from "react";
import { Credentials } from '../types/auth';
import { storage } from "../utils/storage";
import { AuthContext } from "./AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [credentials, setCredentials] = useState<Credentials | null>(storage.getCredentials());

  const login = (idInstance: string, apiTokenInstance: string) => {
    const newCredentials = { idInstance, apiTokenInstance }
    storage.saveCredentials(newCredentials);
    setCredentials(newCredentials)
  }

  const logout = () => {
    storage.clearCredentials()
    setCredentials(null)
  }

  return (
    <AuthContext.Provider value={{ credentials, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

