import { useEffect, useState } from 'react';

export default function useDadosBanco() {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    fetch('/api/dados')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setDados(data);
        } else if (data && Array.isArray(data.data)) {
          setDados(data.data);
        } else {
          setDados([]);
        }
      })
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { dados, loading, error };
}
