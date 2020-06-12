const express = require('express');     // Web Server
const PORT = process.env.PORT || 3000;  // Web Server Port
const app = express();                  // Web App
const path = require("path");
const cors = require('cors');

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// API Endpoints
const { api } = require("./controllers/api");
app.use("/api", api);

// Serve Static Assets in Production Environment (e.g. Heroku)
if (process.env.NODE_ENV === "production")
    app.use(express.static("client/build"));

// Redirect Requests to React App (Client). Note: Declare API Endpoints Beforehand.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Initializing Web Server
app.listen(PORT, () => {
    console.log(`\nCORS-enabled Express web server listening on port: ${PORT}\n`);
});