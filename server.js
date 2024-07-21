// server.js
const express = require('express');
const Airtable = require('airtable');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const base = new Airtable({apiKey: 'patuyBWMIypYphVl4.e5174b86499f75093a1a61fd33229b59fbd446849e75024337d0b469ebc1edaa'}).base('appjMFSP6U6V4cwTO');

app.post('/register', async (req, res) => {
  const { username, password, userData } = req.body;
  
  try {
    const existingUsers = await base('Users').select({
      filterByFormula: `{Username} = '${username}'`
    }).firstPage();

    if (existingUsers.length > 0) {
      return res.json({ success: false, error: 'Username already exists' });
    }

    await base('Users').create([
      {
        fields: {
          Username: username,
          Password: password,
          UserData: JSON.stringify(userData)
        }
      }
    ]);

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Registration failed' });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const users = await base('Users').select({
      filterByFormula: `AND({Username} = '${username}', {Password} = '${password}')`
    }).firstPage();

    if (users.length === 0) {
      return res.json({ success: false, error: 'Invalid credentials' });
    }

    const userData = JSON.parse(users[0].fields.UserData || '{}');
    res.json({ success: true, userData });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Login failed' });
  }
});

app.post('/sync', async (req, res) => {
  const { username, userData } = req.body;
  
  try {
    const users = await base('Users').select({
      filterByFormula: `{Username} = '${username}'`
    }).firstPage();

    if (users.length === 0) {
      return res.json({ success: false, error: 'User not found' });
    }

    await base('Users').update([
      {
        id: users[0].id,
        fields: {
          UserData: JSON.stringify(userData)
        }
      }
    ]);

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Sync failed' });
  }
});

// Allow requests from the Github Pages domain due to CORS policy
const cors = require('cors');
app.use(cors({ origin: 'https://maz-ax.github.io/SchedulingStatistically.github.io/' }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));