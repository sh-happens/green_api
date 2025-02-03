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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('Failed to authenticate. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, setter: (value: string) => void) => {
    setter(e.target.value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            WhatsApp Web Clone
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your GREEN-API credentials
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="idInstance" className="sr-only">
                ID Instance
              </label>
              <input
                id="idInstance"
                name="idInstance"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="ID Instance"
                value={idInstance}
                onChange={(e) => handleInputChange(e, setIdInstance)}
              />
            </div>
            <div>
              <label htmlFor="apiTokenInstance" className="sr-only">
                API Token Instance
              </label>
              <input
                id="apiTokenInstance"
                name="apiTokenInstance"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="API Token Instance"
                value={apiTokenInstance}
                onChange={(e) => handleInputChange(e, setApiTokenInstance)}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-400"
            >
              {isLoading ? 'Connecting...' : 'Connect to WhatsApp'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;