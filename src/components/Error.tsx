import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import type { ErrorProps } from '../models/ErrorProps';

//---------------------- Animations ---------------------//
const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const shake = keyframes`
  0%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  75% {
    transform: translateX(5px);
  }
`;

//---------------------- Styled Components ---------------------//
const getBackgroundColor = (tipo: string) => {
  switch (tipo) {
    case 'warning':
      return '#ff9800';
    case 'info':
      return '#2196f3';
    case 'error':
    default:
      return '#b7322c';
  }
};

const getIcon = (tipo: string) => {
  switch (tipo) {
    case 'warning':
      return '⚠️';
    case 'info':
      return 'ℹ️';
    case 'error':
    default:
      return '❌';
  }
};

const MensajeContainer = styled.div<{ tipo: string }>`
  background-color: ${props => getBackgroundColor(props.tipo)};
  padding: 1rem 1.5rem;
  border-radius: 10px;
  color: #fff;
  font-family: 'Bebas Neue', cursive;
  text-align: center;
  position: relative;
  animation:
    ${slideIn} 0.3s ease-out,
    ${shake} 0.5s ease-in-out 0.3s;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-left: 4px solid rgba(255, 255, 255, 0.3);

  @media (max-width: 768px) {
    padding: 0.8rem 1rem;
  }
`;

const MensajeContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const IconSpan = styled.span`
  font-size: 1.2rem;
  flex-shrink: 0;
`;

const MensajeTexto = styled.p`
  font-size: 1.1rem;
  font-weight: bold;
  text-transform: uppercase;
  margin: 0;
  letter-spacing: 0.5px;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: #fff;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  &:focus {
    outline: 2px solid rgba(255, 255, 255, 0.5);
    outline-offset: 1px;
  }
`;

//---------------------- Component ---------------------//
const Error: React.FC<ErrorProps> = ({ mensaje, tipo = 'error', onClose }) => {
  return (
    <MensajeContainer tipo={tipo} role="alert" aria-live="polite">
      {onClose && (
        <CloseButton onClick={onClose} aria-label="Cerrar mensaje de error" title="Cerrar">
          ✕
        </CloseButton>
      )}

      <MensajeContent>
        <IconSpan role="img" aria-hidden="true">
          {getIcon(tipo)}
        </IconSpan>
        <MensajeTexto>{mensaje}</MensajeTexto>
      </MensajeContent>
    </MensajeContainer>
  );
};

export default Error;
