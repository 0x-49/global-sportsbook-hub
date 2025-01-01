export interface Country {
  code: string;
  name: string;
}

export interface TopCountry {
  countryCode: string;
  countryName: string;
  visitsShare: number;
}

export interface Sportsbook {
  UniqueID: number;
  Name: string;
  Description: string;
  URL: string;
  LogoIcon?: string;
  domainName: string;
  "Descriptions Object URL": string;
  "estimatedMonthlyVisits/2024-09-01": number;
  "estimatedMonthlyVisits/2024-10-01": number;
  "estimatedMonthlyVisits/2024-11-01": number;
  [key: `topCountries/${number}/countryCode`]: string;
  [key: `topCountries/${number}/countryName`]: string;
  [key: `topCountries/${number}/visitsShare`]: number;
  [key: string]: string | number | undefined;
}