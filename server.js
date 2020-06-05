const express = require('express'); // Web Server
const app = express(); // Web App
const PORT = 3000; // Web Server Port
const cors = require('cors');
const bcrypt = require('bcrypt'); // Password Hashing Tool
const saltRounds = 10; // bcrypt Salting
const knex = require('knex'); // SQL Query Builder

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connecting to PostgreSQL database
const db = knex({
    client: 'pg',
    connection: {
        host: 'localhost', // '127.0.0.1'
        user: 'ztm_admin',
        password: 'ztmr0ck5!',
        database: 'face_recognition'
    }
});

/*
==================================
        Back-End API
==================================
*/

/* Prospective API Routes
    /
    /signin --> POST = success/fail
    /register --> POST = user
    /profile/:userId --> GET = user
    /image --> PUT --> user or count
    /logout
    *
End of Prospective API Routes */

app.get('/', (req, res) => {
    res.json("Welcome to the Zero-To-Mastery Face Recognition App!");
});

app.post('/signin', (req, res) => {
    const { email, password } = req.body;
    if (email != '' && password != '') {
        db.select()
            .from('logins')
            .where({ email })
            .then(results => {
                if (results.length) {
                    bcrypt.compare(password, results[0].hash, (error, result) => {
                        if (result) {
                            db.select()
                                .from('users')
                                .where({ email })
                                .then(user => res.json(user[0]))
                                .catch(error => res.json("Unable to retrieve user."))
                        } else
                            res.status(400).json("Invalid login. Please try again.");
                    });
                } else
                    res.status(400).json("Invalid login. Please try again.");
            })
            .catch(error => {
                console.log(error);
                res.status(400).json("Something went wrong. Please try again.");
            });
    } else
        res.status(400).json("Invalid login. Please try again.");
});

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    if (name && email && password) {
        const newUser = {
            name,
            email,
            joined: new Date()
        };
        db('users')
            .returning('*') // returns specified columns for inserted row
            .insert(newUser)
            .then(user => {
                if (user.length) {
                    console.log(user);
                    bcrypt.hash(password, saltRounds, (error, hash) => {
                        if (error) res.status(400).json("Unable to encrypt password");
                        db('logins')
                            .insert({
                                email: user[0].email,
                                hash
                            })
                            .then(result => res.json(user[0]))
                            .catch(error => {
                                console.log(error);
                                res.status(400).json("Unable to create login");
                            })
                    })
                }
            })
            .catch(error => {
                console.log(error);
                res.status(400).json("Something failed. Please try again.");
            })
    } else {
        res.status(400).json('Please enter valid data and try again.');
    };
});

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    db.select()
        .from('users')
        .where({ id })
        .then(user => {
            if (user.length) res.json(user[0])
            else res.json("User not found");
        })
        .catch(error => {
            console.log("\nError:\n", error);
            res.status(400).json("Oops, something went wrong.");
        });
});

app.put('/image', (req, res) => {
    const { id } = req.body;
    db('users')
        .where({ id })
        .increment('entries', 1)
        .returning('entries')
        .then(result => res.json(result[0]))
        .catch(error => {
            console.log("\nError:\n", error);
            res.status(400).json("Unable to retrieve entries.");
        });
});

app.get('*', (req, res) => {
    res.send('<h1>Looks like you\'ve reached a non-existent page. Please use a valid URL.</h1>');
});

/*
==================================
        End of Back-End API
==================================
*/

// Initializing Web Server
app.listen(PORT, () => {
    console.log(`\nCORS-enabled Express web server listening on port: ${PORT}\n`);
});