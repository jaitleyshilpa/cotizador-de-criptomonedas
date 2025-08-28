import type { CotizacionData } from './CotizacionData';

export interface CotizacionProps {
  resultado: CotizacionData;
  onNuevaCotizacion?: () => void;
}
