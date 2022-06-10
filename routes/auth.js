require('dotenv').config()
const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const { body, validationResult } = require('express-validator');
// JSON Web Token used for verifying a user at every stage 
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

// Register
router.post('/register',
    [
        // Validating using express validator 
        body('username', 'Enter a valid username').isLength({ min: 3 }),
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Enter a valid password').isLength({ min: 5 })
    ],
    async (req, res) => {
        let success = false;
        // If there are errors return error with its message
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }

        try {
            // Check whether a user exists or not
            let user = await User.findOne({ email: req.body.email })
            if (user) {
                // If user already exists return error
                return res.status(400).json({ success, error: "User already exists" })
            }

            // Check whether same username exists or not
            let uname = await User.findOne({ username: req.body.username })
            if (uname) {
                // If user already exists return error
                return res.status(400).json({ success, error: "Username already exists please select another one" })
            }

            //  Hashing password using bcrypt
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);

            // Creating a new user   
            user = await User.create({
                username: req.body.username,
                email: req.body.email,
                password: secPass,
            })

            // Creating auth token
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);
            success = true;
            // Sending response that user has been saved successfully 
            res.json({ success, authToken })

        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    })

// Login 
router.post('/login', async (req, res) => {
    let success = false;
    try {
        let user = await User.findOne({ email: req.body.email })
        if (!user) {
            // If user already exists return error
            return res.status(400).json({ success, error: "Incorrect Credentials" })
        }

        let checkPassword = await bcrypt.compare(req.body.password, user.password)
        if (!checkPassword) {
            return res.status(400).json({ success, error: "Incorrect Credentials" })
        }
        // Creating auth token
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        // Sending response that user has been saved successfully 
        res.json({ success, authToken })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})



module.exports = router