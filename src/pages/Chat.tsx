import React from 'react';
import { useAuth } from '../hooks/useAuth';

const Chat: React.FC = () => {
  const { credentials, logout } = useAuth();

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-green-600 p-4 text-white flex justify-between items-center">
        <h1>WhatsApp Web Clone</h1>
        <button
          onClick={logout}
          className="px-4 py-2 bg-green-700 rounded hover:bg-green-800"
        >
          Logout
        </button>
      </header>

      <div className="flex flex-1">
        <div className="w-1/3 border-r">
          <div className="p-4 border-b">
            <input
              type="text"
              placeholder="Enter phone number to start chat"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b">
            <p>Select a chat or start a new conversation</p>
          </div>

          <div className="flex-1 p-4">
          </div>

          <div className="p-4 border-t">
            <div className="flex">
              <input
                type="text"
                placeholder="Type a message"
                className="flex-1 p-2 border rounded-l"
              />
              <button className="px-4 py-2 bg-green-600 text-white rounded-r hover:bg-green-700">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;