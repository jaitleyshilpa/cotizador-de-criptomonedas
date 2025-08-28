import React from 'react';
import styled from '@emotion/styled';
import type { CotizacionProps } from '../models/CotizacionProps';

//---------------------- Styled Components ---------------------//
const ResultadoContainer = styled.div`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  padding: 2rem;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: slideIn 0.5s ease-out;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  border-bottom: 2px solid rgba(102, 162, 254, 0.3);
  padding-bottom: 1rem;
`;

const Title = styled.h2`
  color: #66a2fe;
  font-family: 'Bebas Neue', cursive;
  font-size: 2rem;
  margin: 0 0 0.5rem 0;
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  font-size: 1rem;
`;

const PrecioContainer = styled.div`
  text-align: center;
  margin: 2rem 0;
  padding: 1.5rem;
  background: rgba(102, 162, 254, 0.1);
  border-radius: 12px;
  border: 2px solid rgba(102, 162, 254, 0.2);
`;

const PrecioLabel = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.2rem;
  margin: 0 0 0.5rem 0;
  font-weight: 500;
`;

const PrecioValor = styled.p`
  color: #fff;
  font-size: 2.5rem;
  font-weight: bold;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-top: 2rem;

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const InfoCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem;
  border-radius: 10px;
  border-left: 4px solid #66a2fe;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.08);
  }
`;

const InfoLabel = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  margin: 0 0 0.5rem 0;
  font-weight: 500;
`;

const InfoValue = styled.p`
  color: #fff;
  font-size: 1.1rem;
  font-weight: bold;
  margin: 0;
`;

const ChangeValue = styled.span<{ isPositive: boolean }>`
  color: ${props => (props.isPositive ? '#4CAF50' : '#F44336')};
  font-weight: bold;
`;

const ButtonContainer = styled.div`
  margin-top: 2rem;
  text-align: center;
`;

const NuevoButton = styled.button`
  background: transparent;
  border: 2px solid #66a2fe;
  color: #66a2fe;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #66a2fe;
    color: #fff;
    transform: translateY(-2px);
  }
`;

//---------------------- Helper Functions ---------------------//
const formatearFecha = (fecha: string): string => {
  try {
    const fechaObj = new Date(fecha);
    return fechaObj.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return fecha;
  }
};

const formatearPorcentaje = (valor: string): { formatted: string; isPositive: boolean } => {
  const numericValue = parseFloat(valor);
  const isPositive = numericValue >= 0;
  const formatted = `${isPositive ? '+' : ''}${numericValue.toFixed(2)}%`;
  return { formatted, isPositive };
};

//---------------------- Component ---------------------//
const Cotizacion: React.FC<CotizacionProps> = ({ resultado, onNuevaCotizacion }) => {
  // No mostrar nada si no hay datos
  if (!resultado || Object.keys(resultado).length === 0) {
    return null;
  }

  const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE, FROMSYMBOL = 'Crypto', TOSYMBOL = 'USD' } = resultado;

  // Formatear el cambio porcentual
  const cambio = CHANGEPCT24HOUR ? formatearPorcentaje(CHANGEPCT24HOUR) : null;

  return (
    <ResultadoContainer>
      <Header>
        <Title>Cotización Actual</Title>
        <Subtitle>
          {FROMSYMBOL} → {TOSYMBOL}
        </Subtitle>
      </Header>

      {PRICE && (
        <PrecioContainer>
          <PrecioLabel>Precio Actual</PrecioLabel>
          <PrecioValor>{PRICE}</PrecioValor>
        </PrecioContainer>
      )}

      <InfoGrid>
        {HIGHDAY && (
          <InfoCard>
            <InfoLabel>Máximo del día</InfoLabel>
            <InfoValue>{HIGHDAY}</InfoValue>
          </InfoCard>
        )}

        {LOWDAY && (
          <InfoCard>
            <InfoLabel>Mínimo del día</InfoLabel>
            <InfoValue>{LOWDAY}</InfoValue>
          </InfoCard>
        )}

        {cambio && (
          <InfoCard>
            <InfoLabel>Variación 24h</InfoLabel>
            <InfoValue>
              <ChangeValue isPositive={cambio.isPositive}>{cambio.formatted}</ChangeValue>
            </InfoValue>
          </InfoCard>
        )}

        {LASTUPDATE && (
          <InfoCard>
            <InfoLabel>Última actualización</InfoLabel>
            <InfoValue>{formatearFecha(LASTUPDATE)}</InfoValue>
          </InfoCard>
        )}
      </InfoGrid>

      {onNuevaCotizacion && (
        <ButtonContainer>
          <NuevoButton onClick={onNuevaCotizacion}>Nueva Cotización</NuevoButton>
        </ButtonContainer>
      )}
    </ResultadoContainer>
  );
};

export default Cotizacion;
