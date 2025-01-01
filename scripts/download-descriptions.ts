import fs from 'fs/promises';
import path from 'path';
import axios from 'axios';
import sportsbooks from '../public/sportsbooks.json';

const DESCRIPTIONS_DIR = path.join(process.cwd(), 'public', 'descriptions');

async function downloadDescriptions() {
  // Ensure descriptions directory exists
  try {
    await fs.mkdir(DESCRIPTIONS_DIR, { recursive: true });
  } catch (error) {
    console.error('Error creating directory:', error);
  }

  // Process each sportsbook
  for (const sportsbook of sportsbooks) {
    const url = sportsbook["Descriptions Object URL"];
    if (!url) continue;

    try {
      console.log(`Downloading description for ${sportsbook.Name}...`);
      const response = await axios.get(url);
      const content = response.data;

      // Save to local file
      const filePath = path.join(DESCRIPTIONS_DIR, `${sportsbook.UniqueID}.md`);
      await fs.writeFile(filePath, content);
      console.log(`✓ Saved description for ${sportsbook.Name}`);
    } catch (error) {
      console.error(`Error downloading description for ${sportsbook.Name}:`, error);
      // Save the fallback description
      if (sportsbook.Description) {
        const filePath = path.join(DESCRIPTIONS_DIR, `${sportsbook.UniqueID}.md`);
        await fs.writeFile(filePath, sportsbook.Description);
        console.log(`✓ Saved fallback description for ${sportsbook.Name}`);
      }
    }
  }
}

downloadDescriptions().catch(console.error);
