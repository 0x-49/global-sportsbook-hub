import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

interface Sportsbook {
  UniqueID?: string;
  "Description Object URL"?: string;
  [key: string]: any;
}

const SPORTSBOOKS_PATH = join(process.cwd(), 'public', 'sportsbooks.json');
const OUTPUT_PATH = join(process.cwd(), 'public', 'sportsbooks.updated.json');

async function updateDescriptionUrls() {
  try {
    // Read the sportsbooks.json file
    const data = JSON.parse(readFileSync(SPORTSBOOKS_PATH, 'utf8')) as Sportsbook[];

    // Update each sportsbook's description URL to point to local file
    data.forEach((sportsbook) => {
      if (sportsbook.UniqueID) {
        sportsbook["Description Object URL"] = `/descriptions/${sportsbook.UniqueID}.md`;
      }
    });

    // Write to a new file to be safe
    writeFileSync(OUTPUT_PATH, JSON.stringify(data, null, 2));
    console.log('✓ Updated sportsbooks.json with local description URLs');
    console.log('✓ Saved to sportsbooks.updated.json');
    console.log('✓ Review the changes and rename to sportsbooks.json if correct');

  } catch (error) {
    console.error('Error updating description URLs:', error);
  }
}

updateDescriptionUrls();
