export interface ErrorProps {
  mensaje: string;
  tipo?: 'error' | 'warning' | 'info';
  onClose?: () => void;
}
