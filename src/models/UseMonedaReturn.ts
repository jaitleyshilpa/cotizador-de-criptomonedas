import type { JSX } from 'react';

export interface UseMonedaReturn {
  0: string;
  1: () => JSX.Element;
  2: (value: string) => void;
}
