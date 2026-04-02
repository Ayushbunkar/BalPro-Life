import { useCallback, useState } from 'react';

const useApiRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const execute = useCallback(async (requestFn) => {
    setLoading(true);
    setError('');
    try {
      const result = await requestFn();
      return result;
    } catch (err) {
      const message = err?.message || 'Request failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, setError, execute };
};

export default useApiRequest;
