import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';

// Hooks
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';

// Componentes
import Error from './Error';

// Types
import type { FormularioProps } from '../models/FormularioProps';
import type { CriptoData } from '../types';

//---------------------- Styled Components ---------------------//
const Form = styled.form`
  background: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 15px;
  margin-bottom: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const Boton = styled.button`
  margin-top: 20px;
  font-weight: bold;
  font-size: 18px;
  padding: 12px 24px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:hover:not(:disabled) {
    background-color: #326ac0;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 162, 254, 0.3);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:focus {
    outline: 2px solid #66a2fe;
    outline-offset: 2px;
  }
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 1s ease-in-out infinite;
  margin-right: 8px;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const ErrorContainer = styled.div`
  margin-bottom: 1rem;
`;

//---------------------- Component ---------------------//
const Formulario: React.FC<FormularioProps> = ({ onSubmit, isLoading = false }) => {
  // State
  const [listaCripto, setListaCripto] = useState<CriptoData[]>([]);
  const [error, setError] = useState<string>('');
  const [cargandoCriptos, setCargandoCriptos] = useState<boolean>(true);

  // Monedas disponibles
  const MONEDAS = [
    { codigo: 'USD', nombre: 'Dólar - Estados Unidos' },
    { codigo: 'EUR', nombre: 'Euro' },
    { codigo: 'GBP', nombre: 'Libra Esterlina' },
    { codigo: 'JPY', nombre: 'Yen Japonés' },
    { codigo: 'CAD', nombre: 'Dólar Canadiense' },
    { codigo: 'AUD', nombre: 'Dólar Australiano' },
    { codigo: 'CHF', nombre: 'Franco Suizo' },
    { codigo: 'MXN', nombre: 'Peso Mexicano' },
  ];

  // Custom hooks
  const [moneda, SelectMonedas, resetMoneda] = useMoneda('Elige tu Moneda', '', MONEDAS);
  const [criptomoneda, SelectCripto, resetCriptomoneda] = useCriptomoneda('Elige tu Criptomoneda', '', listaCripto);

  // Cargar criptomonedas al montar el componente
  useEffect(() => {
    const consultarAPI = async () => {
      try {
        setCargandoCriptos(true);
        const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD';
        const response = await axios.get(url);

        if (response.data?.Data && Array.isArray(response.data.Data)) {
          setListaCripto(response.data.Data);
        } else {
          throw new Error('Formato de datos inválido');
        }
      } catch (err) {
        console.error('Error al cargar criptomonedas:', err);
        setError('Error al cargar las criptomonedas. Usando lista básica.');

        // Lista de respaldo
        setListaCripto([
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
        ]);
      } finally {
        setCargandoCriptos(false);
      }
    };

    consultarAPI();
  }, []);

  // Manejar envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validación
    if (!moneda.trim() || !criptomoneda.trim()) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    // Limpiar errores y enviar datos
    setError('');
    onSubmit(moneda, criptomoneda);
  };

  // Manejar reset del formulario
  const handleReset = () => {
    resetMoneda('');
    resetCriptomoneda('');
    setError('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && (
        <ErrorContainer>
          <Error mensaje={error} />
        </ErrorContainer>
      )}

      <SelectMonedas />

      {cargandoCriptos ? (
        <p style={{ color: '#fff', textAlign: 'center', margin: '1rem 0' }}>Cargando criptomonedas...</p>
      ) : (
        <SelectCripto />
      )}

      <div style={{ display: 'flex', gap: '1rem', marginTop: '20px' }}>
        <Boton type="submit" disabled={isLoading || cargandoCriptos || !moneda || !criptomoneda}>
          {isLoading && <LoadingSpinner />}
          {isLoading ? 'Cotizando...' : 'Calcular'}
        </Boton>

        <Boton
          type="button"
          onClick={handleReset}
          disabled={isLoading}
          style={{
            backgroundColor: 'transparent',
            border: '2px solid #66a2fe',
            flexBasis: '40%',
          }}>
          Limpiar
        </Boton>
      </div>
    </Form>
  );
};

export default Formulario;
