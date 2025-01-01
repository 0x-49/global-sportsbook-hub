import fs from 'fs';
import path from 'path';
import sportsbooks from '../public/sportsbooks.json';

interface TopCountry {
  countryCode: string;
  countryName: string;
  visitsShare: number;
}

interface Sportsbook {
  UniqueID: number;
  Name: string;
  Description: string;
  URL: string;
  LogoIcon?: string;
  domainName: string;
  "estimatedMonthlyVisits/2024-11-01": number;
  topCountries: TopCountry[];
}

function getCountriesFromSportsbooks(sportsbooks: Sportsbook[]): Set<string> {
  const countries = new Set<string>();
  
  sportsbooks.forEach(sportsbook => {
    sportsbook.topCountries?.forEach(country => {
      if (country.countryCode) {
        countries.add(country.countryCode);
      }
    });
  });

  return countries;
}

function getTopSportsbooksForCountry(sportsbooks: Sportsbook[], countryCode: string): Sportsbook[] {
  return sportsbooks
    .filter(sportsbook => 
      sportsbook.topCountries?.some(country => 
        country.countryCode.toLowerCase() === countryCode.toLowerCase()
      )
    )
    .sort((a, b) => {
      const aTraffic = Number(a["estimatedMonthlyVisits/2024-11-01"]) || 0;
      const bTraffic = Number(b["estimatedMonthlyVisits/2024-11-01"]) || 0;
      return bTraffic - aTraffic;
    })
    .slice(0, 10); // Get top 10 sportsbooks
}

function generateCountryMarkdown(countryCode: string, topSportsbooks: Sportsbook[]): string {
  const countryName = topSportsbooks[0]?.topCountries.find(
    c => c.countryCode.toLowerCase() === countryCode.toLowerCase()
  )?.countryName || countryCode;

  const totalTraffic = topSportsbooks.reduce(
    (sum, sb) => sum + (Number(sb["estimatedMonthlyVisits/2024-11-01"]) || 0),
    0
  );

  return `# Top Sportsbooks in ${countryName}

## Overview
This page provides detailed information about the most popular online sportsbooks in ${countryName}. 
Our analysis is based on real traffic data and user engagement metrics.

### Market Statistics
- Total Monthly Visits: ${totalTraffic.toLocaleString()}
- Number of Active Sportsbooks: ${topSportsbooks.length}

## Top Sportsbooks

${topSportsbooks.map((sb, index) => {
  const countrySpecificShare = sb.topCountries.find(
    c => c.countryCode.toLowerCase() === countryCode.toLowerCase()
  )?.visitsShare || 0;
  
  return `### ${index + 1}. ${sb.Name}
- Monthly Visits: ${Number(sb["estimatedMonthlyVisits/2024-11-01"]).toLocaleString()}
- Market Share in ${countryName}: ${(countrySpecificShare * 100).toFixed(1)}%
- ${sb.Description}
`;
}).join('\n')}

## About This Data
This ranking is based on actual traffic data and user engagement metrics from the past month. 
The market share percentages represent each sportsbook's portion of the total online betting traffic in ${countryName}.

Last Updated: ${new Date().toISOString().split('T')[0]}
`;
}

async function main() {
  const outputDir = path.join(__dirname, '../public/countries');
  
  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const countries = getCountriesFromSportsbooks(sportsbooks as Sportsbook[]);

  for (const countryCode of countries) {
    const topSportsbooks = getTopSportsbooksForCountry(sportsbooks as Sportsbook[], countryCode);
    if (topSportsbooks.length > 0) {
      const markdown = generateCountryMarkdown(countryCode, topSportsbooks);
      fs.writeFileSync(
        path.join(outputDir, `${countryCode.toLowerCase()}.md`),
        markdown
      );
      console.log(`Generated page for ${countryCode}`);
    }
  }
}

main().catch(console.error);
