import type { MonedaOption } from './types';

export const MONEDAS: MonedaOption[] = [
  { codigo: 'USD', nombre: 'Dólar - Estados Unidos', simbolo: '$', bandera: '🇺🇸' },
  { codigo: 'EUR', nombre: 'Euro', simbolo: '€', bandera: '🇪🇺' },
  { codigo: 'GBP', nombre: 'Libra Esterlina', simbolo: '£', bandera: '🇬🇧' },
  { codigo: 'JPY', nombre: 'Yen Japonés', simbolo: '¥', bandera: '🇯🇵' },
  { codigo: 'CAD', nombre: 'Dólar Canadiense', simbolo: 'C$', bandera: '🇨🇦' },
  { codigo: 'AUD', nombre: 'Dólar Australiano', simbolo: 'A$', bandera: '🇦🇺' },
  { codigo: 'CHF', nombre: 'Franco Suizo', simbolo: 'CHF', bandera: '🇨🇭' },
  { codigo: 'MXN', nombre: 'Peso Mexicano', simbolo: '$', bandera: '🇲🇽' },
  { codigo: 'BRL', nombre: 'Real Brasileño', simbolo: 'R$', bandera: '🇧🇷' },
  { codigo: 'ARS', nombre: 'Peso Argentino', simbolo: '$', bandera: '🇦🇷' },
];

export const API_ENDPOINTS = {
  CRYPTO_LIST: 'https://min-api.cryptocompare.com/data/top/mktcapfull',
  PRICE_MULTI: 'https://min-api.cryptocompare.com/data/pricemultifull',
  HISTORICAL: 'https://min-api.cryptocompare.com/data/v2/histoday',
} as const;

export const DEFAULT_CONFIG = {
  CRYPTO_LIMIT: 20,
  SPINNER_DELAY: 1500,
  REQUEST_TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
} as const;

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Sin conexión a internet. Verifica tu conexión y vuelve a intentar.',
  RATE_LIMIT: 'Demasiadas solicitudes. Por favor, espera un momento antes de intentar nuevamente.',
  INVALID_DATA: 'No se encontraron datos para esta combinación.',
  GENERIC_ERROR: 'Ha ocurrido un error inesperado. Por favor, intenta nuevamente.',
  FIELDS_REQUIRED: 'Todos los campos son obligatorios.',
  LOADING_CRYPTOS: 'Error al cargar las criptomonedas. Usando lista básica.',
} as const;

export const THEME = {
  colors: {
    primary: '#66a2fe',
    primaryHover: '#326ac0',
    success: '#4caf50',
    error: '#f44336',
    warning: '#ff9800',
    info: '#2196f3',
    white: '#ffffff',
    background: 'rgba(255, 255, 255, 0.1)',
    border: 'rgba(255, 255, 255, 0.2)',
  },
  breakpoints: {
    mobile: '768px',
    tablet: '992px',
    desktop: '1200px',
  },
  animations: {
    duration: '0.3s',
    easing: 'ease',
  },
} as const;
