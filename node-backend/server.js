const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const couchDBUrl = 'http://127.0.0.1:5984';
const dbName = 'employee';

app.post('/addEmployee', async (req, res) => {
  try {
    const { name, id, fingerprintImage } = req.body;

    // Base64 encode the image (you might want to use a library for this)
    const base64Image = Buffer.from(fingerprintImage).toString('base64');

    // Save data to CouchDB using request library
    const requestOptions = {
      url: `${couchDBUrl}/${dbName}`, // Adjust the URL to include the database name
      method: 'POST',
      auth: {
        user: 'admin',
        pass: 'admin'
      },
      json: { name, id, fingerprintImage: base64Image },
    };

    request(requestOptions, (error, response, body) => {
      if (error) {
        console.error('Error saving to CouchDB:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
      } else {
        if (body.ok) {
          // Successfully added to CouchDB
          res.json({ success: true, id: body.id });
        } else {
          // CouchDB returned an error
          console.error('Error saving to CouchDB:', body);
          res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
