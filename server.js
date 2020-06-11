const express = require('express'); // Web Server
const app = express(); // Web App
const PORT = process.env.PORT || 3000; // Web Server Port
const cors = require('cors');
// const bcrypt = require('bcrypt'); // Password Hashing Tool
// const saltRounds = 10; // bcrypt Salting
// const knex = require('knex'); // SQL Query Builder

// Controller Modules
// const image = require('./controllers/image');
// const profile = require('./controllers/profile');
// const register = require('./controllers/register');
// const signin = require('./controllers/signin');

// API Endpoints
const { api } = require("./controllers/api");
app.use("/api", api);


// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// PostgreSQL Database
// if (process.env.DATABASE_URL) {
//     const db = knex({
//         client: 'pg',
//         connection: {
//             connectionString: process.env.DATABASE_URL,
//             ssl: true
//         }
//     });
// } else {
//     const db = knex({
//         client: 'pg',
//         connection: {
//             host: 'localhost', // 127.0.0.1
//             user: 'ztm_admin',
//             password: 'ztmr0ck5!',
//             database: 'face_recognition'
//         }
//     });
// }
/*
==================================
        Back-End API
==================================
*/

// app.get('/', (req, res) => { res.json("Welcome to the Zero-To-Mastery Face Recognition App!") });
// app.post('/signin', (req, res) => { signin.handleSignIn(req, res, db, bcrypt) });
// app.post('/register', (req, res) => { register.handleRegistration(req, res, db, bcrypt, saltRounds) });
// app.get('/profile/:id', (req, res) => { profile.getProfile(req, res, db) });
// app.put('/image', (req, res) => { image.scanImage(req, res, db) });
// app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) });
// app.get('*', (req, res) => { res.send('<h1>Looks like you\'ve reached a non-existent page. Please use a valid URL.</h1>') });

/*
==================================
        End of Back-End API
==================================
*/

// Serve Static Assets in Production Environment (e.g. Heroku)
if (process.env.NODE_ENV === "production")
    app.use(express.static("client/build"));


// Redirect Requests to React App (Client). Note: Declare API Endpoints Beforehand.
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Initializing Web Server
app.listen(PORT, () => {
    console.log(`\nCORS-enabled Express web server listening on port: ${PORT}\n`);
});