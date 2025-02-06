import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useMessages } from '../hooks/useMessages';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'contact';
  timestamp: Date;
}

interface Chat {
  phoneNumber: string;
  messages: Message[];
}

const Chat: React.FC = () => {
  const { logout } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [chats, setChats] = useState<Record<string, Chat>>({})
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState<string>('');
  const { sendMessage } = useMessages(activeChat);

  const handleStartChat = (e: FormEvent) => {
    e.preventDefault();
    const cleanedNumber = phoneNumber.replace(/\D/g, '');
    if (cleanedNumber.length < 11) {
      alert('Phone number must be at least 11 digits');
      return;
    }

    setChats(prev => ({
      ...prev,
      [cleanedNumber]: { phoneNumber: cleanedNumber, messages: [] }
    }));
    setActiveChat(cleanedNumber);
    setPhoneNumber('');
  };

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeChat) return;

    try {
      const message = await sendMessage(newMessage);
      if (message) {
        setChats(prev => ({
          ...prev,
          [activeChat]: {
            ...prev[activeChat],
            messages: [...prev[activeChat].messages, message]
          }
        }));
      }
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const activeMessages = activeChat ? chats[activeChat]?.messages : [];

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-green-600 p-4 text-white flex justify-between items-center">
        <h1>WhatsApp Web Clone</h1>
        <button onClick={logout} className="px-4 py-2 bg-green-700 rounded hover:bg-green-800">Logout</button>
      </header>

      <div className="flex flex-1">
        <div className="w-1/3 border-r">
          <form onSubmit={handleStartChat} className="p-4 border-b">
            <input
              type="text"
              value={phoneNumber}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value)}
              placeholder="Enter phone number"
              className="w-full p-2 border rounded"
            />
          </form>
          <div className="overflow-y-auto">
            {Object.values(chats).map((chat) => (
              <div
                key={chat.phoneNumber}
                onClick={() => setActiveChat(chat.phoneNumber)}
                className={`p-4 cursor-pointer hover:bg-gray-100 ${activeChat === chat.phoneNumber ? 'bg-gray-100' : ''
                  }`}
              >
                <p className="font-medium">{chat.phoneNumber}</p>
                <p className="text-sm text-gray-500">
                  {chat.messages[chat.messages.length - 1]?.text || 'No messages'}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b">
            <p>{activeChat || 'Select a chat'}</p>
          </div>

          <div className="flex-1 p-4 overflow-y-auto">
            {activeMessages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'
                  }`}
              >
                <div
                  className={`inline-block p-2 rounded-lg ${message.sender === 'user' ? 'bg-green-100' : 'bg-gray-100'
                    }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="p-4 border-t">
            <div className="flex">
              <input
                type="text"
                value={newMessage}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setNewMessage(e.target.value)}
                placeholder="Type a message"
                className="flex-1 p-2 border rounded-l"
              />
              <button
                type="submit"
                disabled={!activeChat}
                className="px-4 py-2 bg-green-600 text-white rounded-r hover:bg-green-700 disabled:bg-gray-400"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;