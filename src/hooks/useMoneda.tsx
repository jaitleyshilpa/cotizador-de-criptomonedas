import { useState, type JSX } from 'react';
import styled from '@emotion/styled';
import type { Opcion } from '../models/Opcion';

//---------------------- Styled Components ---------------------//
const Container = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  font-family: 'Bebas Neue', cursive;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  display: block;
`;

const Select = styled.select`
  width: 100%;
  display: block;
  padding: 12px 16px;
  border-radius: 10px;
  border: 2px solid transparent;
  font-size: 1rem;
  background-color: #fff;
  color: #333;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #66a2fe;
    box-shadow: 0 0 0 3px rgba(102, 162, 254, 0.1);
  }

  &:hover {
    border-color: rgba(102, 162, 254, 0.3);
  }

  option {
    padding: 8px;
  }
`;

//---------------------- Hook ---------------------//
const useMoneda = (
  label: string,
  stateInicial: string,
  opciones: Opcion[]
): [string, () => JSX.Element, (value: string) => void] => {
  const [state, setState] = useState<string>(stateInicial);

  const Seleccionar = (): JSX.Element => (
    <Container>
      <Label htmlFor="moneda">{label}</Label>
      <Select id="moneda" name="moneda" onChange={e => setState(e.target.value)} value={state} aria-label={label}>
        <option value="">- Seleccione una opción -</option>
        {opciones.map(opcion => (
          <option key={opcion.codigo} value={opcion.codigo}>
            {opcion.nombre}
          </option>
        ))}
      </Select>
    </Container>
  );

  return [state, Seleccionar, setState];
};

export default useMoneda;
