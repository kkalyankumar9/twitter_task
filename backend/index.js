// index.js
const express = require('express');
const { TwitterApi } = require('twitter-api-v2');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Set up your Twitter API client
// const client = new TwitterApi({
//   appKey: process.env.API_KEY,
//   appSecret: process.env.API_KEY_SECRET,
//   accessToken: process.env.ACCESS_TOKEN,
//   accessSecret: process.env.ACCESS_TOKEN_SECRET,
// });
const client = new TwitterApi(process.env.BEARER_TOKEN);

// Define a route to search for tweets by keyword
app.get('/search', async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter "q" is required' });
  }

  try {
    // Search for tweets using the query parameter
    const searchResults = await client.v2.search(query, { max_results: 10 });

    // Send the search results as a JSON response
    res.json(searchResults.data);
  } catch (error) {
    console.error('Error fetching tweets:', error);
    res.status(500).json({ error: 'Failed to search tweets' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
