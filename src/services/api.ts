import axios from "axios"
import { Credentials } from "../types/auth"

const createApiInstance = () => {
  const baseURL = 'https://api.green-api.com'

  return axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',

    }
  })
}

export const apiService = {
  sendMessage: async (credentials: Credentials, phoneNumber: string, message: string) => {
    const api = createApiInstance()
    return api.post(
      `/waInstance${credentials.idInstance}/sendMessage/${credentials.apiTokenInstance}/`,
      {
        chatId: `${phoneNumber}@c.us`,
        message
      }
    )
  },

  receiveNotification: async (credentials: Credentials) => {
    const api = createApiInstance();
    return api.get(
      `/waInstance${credentials.idInstance}/receiveNotification/${credentials.apiTokenInstance}/`
    );
  },

  deleteNotification: async (credentials: Credentials, receiptId: number) => {
    const api = createApiInstance();
    return api.delete(
      `/waInstance${credentials.idInstance}/deleteNotification/${credentials.apiTokenInstance}/${receiptId}/`
    );
  }
}