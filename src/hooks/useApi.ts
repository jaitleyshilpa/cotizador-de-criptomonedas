// hooks/useApi.ts
import { useState, useCallback } from 'react';
import axios, { AxiosError } from 'axios';
import { API_ENDPOINTS, DEFAULT_CONFIG, ERROR_MESSAGES } from '../constants';
import type { CotizacionData, CriptoData } from '../types';

// Hook para manejar cotizaciones
export const useCotizacion = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [data, setData] = useState<CotizacionData>({});

  const getCotizacion = useCallback(async (criptomoneda: string, moneda: string) => {
    if (!criptomoneda || !moneda) return;

    try {
      setLoading(true);
      setError('');

      const url = `${API_ENDPOINTS.PRICE_MULTI}?fsyms=${criptomoneda}&tsyms=${moneda}`;

      const response = await axios.get(url, {
        timeout: DEFAULT_CONFIG.REQUEST_TIMEOUT,
      });

      if (response.data?.DISPLAY?.[criptomoneda]?.[moneda]) {
        // Simular delay para mostrar spinner
        setTimeout(() => {
          setData(response.data.DISPLAY[criptomoneda][moneda]);
          setLoading(false);
        }, DEFAULT_CONFIG.SPINNER_DELAY);
      } else {
        throw new Error(ERROR_MESSAGES.INVALID_DATA);
      }
    } catch (err) {
      setLoading(false);
      setData({});

      if (axios.isAxiosError(err)) {
        if (err.code === 'ECONNABORTED') {
          setError('La solicitud ha tardado demasiado. Inténtalo de nuevo.');
        } else if (err.response?.status === 429) {
          setError(ERROR_MESSAGES.RATE_LIMIT);
        } else if (!navigator.onLine) {
          setError(ERROR_MESSAGES.NETWORK_ERROR);
        } else {
          setError('Error al obtener los datos. Por favor, verifica tu conexión e intenta nuevamente.');
        }
      } else {
        setError(ERROR_MESSAGES.GENERIC_ERROR);
      }
    }
  }, []);

  const reset = useCallback(() => {
    setData({});
    setError('');
    setLoading(false);
  }, []);

  return {
    data,
    loading,
    error,
    getCotizacion,
    reset,
  };
};

// Hook para manejar lista de criptomonedas
export const useCriptoList = () => {
  const [cryptos, setCryptos] = useState<CriptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  const loadCryptos = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      const url = `${API_ENDPOINTS.CRYPTO_LIST}?limit=${DEFAULT_CONFIG.CRYPTO_LIMIT}&tsym=USD`;
      const response = await axios.get(url, {
        timeout: DEFAULT_CONFIG.REQUEST_TIMEOUT,
      });

      if (response.data?.Data && Array.isArray(response.data.Data)) {
        setCryptos(response.data.Data);
      } else {
        throw new Error('Formato de datos inválido');
      }
    } catch (err) {
      console.error('Error al cargar criptomonedas:', err);
      setError(ERROR_MESSAGES.LOADING_CRYPTOS);

      // Lista de respaldo
      setCryptos([
        {
          CoinInfo: {
            Id: '1182',
            Name: 'BTC',
            FullName: 'Bitcoin (BTC)',
          },
        },
        {
          CoinInfo: {
            Id: '7605',
            Name: 'ETH',
            FullName: 'Ethereum (ETH)',
          },
        },
        {
          CoinInfo: {
            Id: '5031',
            Name: 'ADA',
            FullName: 'Cardano (ADA)',
          },
        },
        {
          CoinInfo: {
            Id: '5426',
            Name: 'SOL',
            FullName: 'Solana (SOL)',
          },
        },
        {
          CoinInfo: {
            Id: '321992',
            Name: 'DOT',
            FullName: 'Polkadot (DOT)',
          },
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    cryptos,
    loading,
    error,
    loadCryptos,
  };
};

// Hook genérico para peticiones API con retry
export const useApiCall = <T>() => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const makeRequest = useCallback(
    async (requestFn: () => Promise<T>, retries = DEFAULT_CONFIG.RETRY_ATTEMPTS): Promise<T | null> => {
      try {
        setLoading(true);
        setError('');

        const result = await requestFn();
        return result;
      } catch (err) {
        if (retries > 0) {
          // Esperar antes de reintentar
          await new Promise(resolve => setTimeout(resolve, 1000));
          return makeRequest(requestFn, retries - 1);
        }

        if (axios.isAxiosError(err)) {
          const axiosError = err as AxiosError;
          if (axiosError.response?.status === 429) {
            setError(ERROR_MESSAGES.RATE_LIMIT);
          } else if (!navigator.onLine) {
            setError(ERROR_MESSAGES.NETWORK_ERROR);
          } else {
            setError(`Error ${axiosError.response?.status || 'desconocido'}: ${axiosError.message}`);
          }
        } else {
          setError(ERROR_MESSAGES.GENERIC_ERROR);
        }

        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    loading,
    error,
    makeRequest,
  };
};
