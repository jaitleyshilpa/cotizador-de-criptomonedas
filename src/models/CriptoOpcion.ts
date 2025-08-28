export interface CriptoOpcion {
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
