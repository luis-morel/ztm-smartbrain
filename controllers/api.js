const router = require("express").Router();     // Express Router
const { db } = require("../config/postgresql"); // PostgreSQL
const bcrypt = require('bcrypt');               // Password Hashing Tool
const saltRounds = 10;                          // Password Salting

// Controller Modules
const image = require('./image');
const profile = require('./profile');
const register = require('./register');
const signin = require('./signin');

// API Endpoints
router.post('/signin', (req, res) => { signin.handleSignIn(req, res, db, bcrypt) });
router.post('/register', (req, res) => { register.handleRegistration(req, res, db, bcrypt, saltRounds) });
router.get('/profile/:id', (req, res) => { profile.getProfile(req, res, db) });
router.put('/image', (req, res) => { image.scanImage(req, res, db) });
router.post('/imageurl', (req, res) => { image.handleApiCall(req, res) });

module.exports = {
    api: router
};