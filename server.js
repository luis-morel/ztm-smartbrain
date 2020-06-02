const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/* Prospective API Routes
    /
    /signin --> POST = success/fail
    /register --> POST = user
    /profile/:userId --> GET = user
    /image --> PUT --> user or count
    /logout
    *
End of Prospective API Routes */

// Temporary fake database
const database = {
    users: [
        {
            id: '123',
            name: 'Jimmy',
            email: 'jimmy@gmail.com',
            password: 'jingles',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'supreme',
            entries: 0,
            joined: new Date()
        }
    ],
    logins: [
        {
            id: '987',
            hash: '',
            email: ''
        }
    ]
};

app.get('/', (req, res) => {
    res.json(database);
});

app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email 
        && req.body.password === database.users[0].password) {
        const secureUser = {
            id: database.users[0].id,
            name: database.users[0].name,
            email: database.users[0].email,
            entries: database.users[0].entries,
            joined: database.users[0].joined
        }
        res.json(secureUser);
    } else {
        res.status(400).json('User not found in database.');
    };
});

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    if (name && email && password) {
        const newUser = {
            id: (((Math.floor(Math.random() * 899)) + 100).toString()),
            name,
            email,
            password,
            entries: 0,
            joined: new Date()
        }
        database.users.push(newUser);
        console.log("New user registered successfully:\n\n", database.users[database.users.length - 1]);
        const secureNewUser = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            entries: 0,
            joined: newUser.joined
        }
        res.json(secureNewUser);
    } else {
        res.status(400).json('Invalid data submitted.')
    };
});

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let exists = false;
    database.users.forEach((user) => {
        if (user.id === id) {
            exists = true;
            return res.json(user);
        };
    });
    if (!exists) {
        res.status(400).json("User not found.");
    };
});

app.put('/image', (req, res) => {
    const { id } = req.body;
    let exists = false;
    database.users.forEach((user) => {
        if (user.id === id) {
            exists = true;
            return res.json(++user.entries);
        };
    });
    if (!exists) {
        res.status(400).json("User not found.");
    };
});

app.get('*', (req, res) => {
    res.send('<h1>Oops, you\'ve reached an invalid URL. Please enter a valid URL.</h1>');
});

app.listen(PORT, () => {
    console.log(`\nCORS-enabled Express web server listening on port: ${PORT}\n`);
});