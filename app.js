const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const mammoth = require('mammoth');
const fs = require('fs');
const port = process.env.PORT || 3000;

app.use(cors());

// Connect to MongoDB Atlas
const { MongoClient } = require('mongodb');

const uri = "****"; // Replace with your MongoDB Atlas connection URI

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Connected to MongoDB Atlas!");
  } catch (err) {
    console.error('Error connecting to MongoDB Atlas: ', err);
  }
}

run().catch(console.dir);

// Middleware

app.use(bodyParser.json());
app.use(express.static('public')); // Assuming your static files are in a 'public' directory

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Retrieve a text document by ID
app.get('/api/text/:id', async (req, res) => {
    const { id } = req.params;
    try {
      // Implement your logic to retrieve the text from MongoDB Atlas here
      const text = { content: 'Sample text' }; // Replace with actual data
      res.json(text);
    } catch (error) {
      res.status(500).json({ error: 'Could not retrieve the text document.' });
    }
  });
  
// Create a new text document
app.post('/api/text', async (req, res) => {
  const { content } = req.body;
  try {
    // Implement your logic to save the text in MongoDB Atlas here
    res.json({ success: true, message: 'Text saved successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Could not create the text document.' });
  }
});

// Update a text document
app.put('/api/text/:id', async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  try {
    // Implement your logic to update the text in MongoDB Atlas here
    res.json({ success: true, message: 'Text updated successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Could not update the text document.' });
  }
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
