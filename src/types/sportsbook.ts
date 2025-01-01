export interface CountryShare {
  countryCode: string;
  countryName: string;
  visitsShare: number;
}

export interface Sportsbook {
  Name: string;
  Description: string;
  LogoIcon: string;
  estimatedMonthlyVisits: {
    [key: string]: number;
  };
  topCountries: CountryShare[];
}