import type { JSX } from 'react';

export interface CriptoData {
  CoinInfo: {
    Id: string;
    Name: string;
    FullName: string;
    ImageUrl?: string;
  };
  RAW?: {
    USD?: {
      PRICE: number;
      CHANGEPCT24HOUR: number;
      MKTCAP: number;
    };
  };
}

export interface MonedaOption {
  codigo: string;
  nombre: string;
  simbolo?: string;
  bandera?: string;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface ApiError {
  message: string;
  code?: string | number;
  status?: number;
}

export type ErrorType = 'error' | 'warning' | 'info';

export interface UseMonedaReturn {
  value: string;
  component: () => JSX.Element;
  setValue: (value: string) => void;
  reset: () => void;
}

export interface UseCriptomonedaReturn {
  value: string;
  component: () => JSX.Element;
  setValue: (value: string) => void;
  reset: () => void;
}
