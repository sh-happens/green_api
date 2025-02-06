import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const LoginForm: React.FC = () => {
  const [idInstance, setIdInstance] = useState<string>('');
  const [apiTokenInstance, setApiTokenInstance] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const validateCredentials = (): boolean => {
    if (!idInstance || !apiTokenInstance) {
      setError('Both fields are required');
      return false;
    }
    if (!/^\d+$/.test(idInstance)) {
      setError('ID Instance should contain only numbers');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!validateCredentials()) {
      return;
    }

    setIsLoading(true);
    try {
      login(idInstance, apiTokenInstance);
      navigate('/chat');
    } catch (err) {
      setError(`Failed to authenticate. Please check your credentials. ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, setter: (value: string) => void) => {
    setter(e.target.value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-96 p-8 bg-white rounded-lg shadow-sm">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-center text-gray-900">
            WhatsApp Web Clone
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your GREEN-API credentials
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              id="idInstance"
              name="idInstance"
              type="text"
              required
              className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
              placeholder="ID Instance"
              value={idInstance}
              onChange={(e) => handleInputChange(e, setIdInstance)}
            />
          </div>

          <div>
            <input
              id="apiTokenInstance"
              name="apiTokenInstance"
              type="password"
              required
              className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
              placeholder="API Token Instance"
              value={apiTokenInstance}
              onChange={(e) => handleInputChange(e, setApiTokenInstance)}
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-medium rounded transition-colors duration-200 disabled:bg-green-400"
          >
            {isLoading ? 'Connecting...' : 'Connect to WhatsApp'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;