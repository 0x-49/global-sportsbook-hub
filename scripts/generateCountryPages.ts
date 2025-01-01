import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sportsbooks from '../public/sportsbooks.json' assert { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  [key: `topCountries/${number}/countryCode`]: string;
  [key: `topCountries/${number}/countryName`]: string;
  [key: `topCountries/${number}/visitsShare`]: number;
}

function getCountriesFromSportsbooks(sportsbooksList: Sportsbook[]): Set<string> {
  const countries = new Set<string>();
  
  sportsbooksList.forEach(sportsbook => {
    for (let i = 0; i < 5; i++) {
      const countryCode = sportsbook[`topCountries/${i}/countryCode`];
      if (countryCode) {
        countries.add(countryCode);
      }
    }
  });

  return countries;
}

function getTopSportsbooksForCountry(sportsbooksList: Sportsbook[], countryCode: string): Sportsbook[] {
  return sportsbooksList
    .filter(sportsbook => {
      for (let i = 0; i < 5; i++) {
        if (sportsbook[`topCountries/${i}/countryCode`]?.toLowerCase() === countryCode.toLowerCase()) {
          return true;
        }
      }
      return false;
    })
    .sort((a, b) => {
      const aTraffic = Number(a["estimatedMonthlyVisits/2024-11-01"]) || 0;
      const bTraffic = Number(b["estimatedMonthlyVisits/2024-11-01"]) || 0;
      return bTraffic - aTraffic;
    })
    .slice(0, 10); // Get top 10 sportsbooks
}

function generateCountryMarkdown(countryCode: string, topSportsbooks: Sportsbook[]): string {
  let countryName = countryCode;
  for (const sb of topSportsbooks) {
    for (let i = 0; i < 5; i++) {
      if (sb[`topCountries/${i}/countryCode`]?.toLowerCase() === countryCode.toLowerCase()) {
        countryName = sb[`topCountries/${i}/countryName`];
        break;
      }
    }
    if (countryName !== countryCode) break;
  }

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
  let countryShare = 0;
  for (let i = 0; i < 5; i++) {
    if (sb[`topCountries/${i}/countryCode`]?.toLowerCase() === countryCode.toLowerCase()) {
      countryShare = Number(sb[`topCountries/${i}/visitsShare`]) || 0;
      break;
    }
  }
  
  return `### ${index + 1}. ${sb.Name}
- Monthly Visits: ${Number(sb["estimatedMonthlyVisits/2024-11-01"]).toLocaleString()}
- Market Share in ${countryName}: ${(countryShare * 100).toFixed(1)}%
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
  const outputDir = path.join(__dirname, '..', 'public', 'countries');
  
  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const countries = getCountriesFromSportsbooks(sportsbooks as unknown as Sportsbook[]);
  console.log(`Found ${countries.size} countries`);

  for (const countryCode of countries) {
    const topSportsbooks = getTopSportsbooksForCountry(sportsbooks as unknown as Sportsbook[], countryCode);
    if (topSportsbooks.length > 0) {
      const markdown = generateCountryMarkdown(countryCode, topSportsbooks);
      const outputPath = path.join(outputDir, `${countryCode.toLowerCase()}.md`);
      fs.writeFileSync(outputPath, markdown);
      console.log(`Generated page for ${countryCode} at ${outputPath}`);
    }
  }

  console.log('Country pages generation complete!');
}

main().catch(console.error);
