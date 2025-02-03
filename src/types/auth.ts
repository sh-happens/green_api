export interface Credentials {
  idInstance: string;
  apiTokenInstance: string;
}

export interface AuthContextType {
  credentials: Credentials | null;
  login: (idInstance: string, apiTokenInstance: string) => void;
  logout: () => void;
}