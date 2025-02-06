import { useState, useEffect, useCallback } from 'react';
import { apiService } from '../services/api';
import { useAuth } from './useAuth';

type Message = {
  text: string;
  sender: 'user' | 'contact';
  timestamp: Date;
  id: string;
};

export const useMessages = (activeChat: string | null) => {
  const { credentials } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isPolling, setIsPolling] = useState(false);

  const startPolling = useCallback(async () => {
    if (!credentials || !activeChat || isPolling) return;

    setIsPolling(true);
    try {
      const response = await apiService.receiveNotification(credentials);
      
      if (response.data && response.data.body?.typeWebhook === 'incomingMessageReceived') {
        const { senderData, messageData } = response.data.body;
        const sender = senderData.sender.split('@')[0];
        
        if (sender === activeChat) {
          const newMessage = {
            text: messageData.textMessageData.textMessage,
            sender: 'contact' as const,
            timestamp: new Date(),
            id: response.data.receiptId.toString()
          };
          setMessages(prev => [...prev, newMessage]);
        }
      }

      if (response.data?.receiptId) {
        await apiService.deleteNotification(credentials, response.data.receiptId);
      }
    } catch (error) {
      console.error('Error receiving message:', error);
    } finally {
      setIsPolling(false);
    }
  }, [credentials, activeChat, isPolling]);

  useEffect(() => {
    const pollInterval = setInterval(startPolling, 5000);
    return () => clearInterval(pollInterval);
  }, [startPolling]);

  const sendMessage = async (message: string) => {
    if (!credentials || !activeChat) return;
    
    try {
      await apiService.sendMessage(credentials, activeChat, message);
      const newMessage = {
        text: message,
        sender: 'user' as const,
        timestamp: new Date(),
        id: Date.now().toString()
      };
      setMessages(prev => [...prev, newMessage]);
      return newMessage;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  };

  return { messages, sendMessage };
};