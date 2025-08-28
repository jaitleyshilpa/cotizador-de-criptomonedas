export interface FormularioProps {
  onSubmit: (moneda: string, criptomoneda: string) => void;
  isLoading?: boolean;
}
