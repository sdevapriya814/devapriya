const express = require('express');
const path = require('path');

const app = express();

// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Catch-all route for SPA / single page app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
// Ping route
app.get("/ping", (req, res) => {
  res.send("Server is alive ✅");
});
// Use Render's dynamic port or localhost:3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🌹 Server running on port ${PORT}`);
});
