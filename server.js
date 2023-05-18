const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const SpotifyWebApi = require('spotify-web-api-node');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const users = [];

// Configure Spotify API
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});

app.use(cors());
app.use(express.json());

// Handle user login and token storage
app.post('/login', (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'Missing token' });
  }

  // Store user token in the array (you may want to enhance this with user-specific data)
  users.push({ token });

  return res.status(200).json({ message: 'Token stored successfully' });
});

// Example route to access user data
app.get('/user/:userId', (req, res) => {
  const { userId } = req.params;

  // Find the user in the array (you can enhance this with a proper user lookup)
  const user = users.find((u) => u.token === userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Example usage: Fetch user data from Spotify API using the stored token
  spotifyApi.setAccessToken(user.token);

  spotifyApi.getMe()
    .then((data) => {
      return res.status(200).json({ user: data.body });
    })
    .catch((error) => {
      return res.status(500).json({ error: 'Failed to fetch user data' });
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
