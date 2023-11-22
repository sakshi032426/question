const express = require('express');
const app = express();
const path = require('path'); // Don't forget to require the 'path' module

const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

app.get('/', (req, res) => {
    // Use path.join to construct the correct file path
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
