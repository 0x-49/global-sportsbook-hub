import express from 'express';
import cors from 'cors';
import axios from 'axios';
import path from 'path';

const app = express();
const port = 3001;

// Enable CORS for the frontend
app.use(cors({
  origin: 'http://localhost:8080',
  methods: ['GET'],
  optionsSuccessStatus: 200
}));

// Proxy endpoint for S3 content
app.get('/api/description/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(
      `https://apex-sportsbooks-content.s3.us-east-1.amazonaws.com/articles/ApexSportsBooksDescription_${id}.md`,
      {
        responseType: 'text'
      }
    );
    res.send(response.data);
  } catch (error) {
    console.error('Error fetching description:', error);
    res.status(500).send('Error fetching description');
  }
});

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
});
