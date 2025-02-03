import { Credentials } from '../types/auth';

const CREDENTIALS_KEY = 'whatsapp_creds'

export const storage = {
  saveCredentials: (credentials: Credentials): void => {
    localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(credentials))
  },

  getCredentials: (): Credentials|null => {
    const credentials = localStorage.getItem(CREDENTIALS_KEY);
    return credentials ? JSON.parse(credentials) : null;
  },

  clearCredentials: (): void => {
    localStorage.removeItem(CREDENTIALS_KEY)
  }
}