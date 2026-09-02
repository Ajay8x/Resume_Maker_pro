const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Fallback to editor.html for root path if index.html is missing
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'editor.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
