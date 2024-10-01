const express = require('express');
const router = express.Router();
const passport = require('passport');

// Login route
router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/posts',
    failureRedirect: '/auth/login',
    failureFlash: true
}));

// Register route
router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    try {
        // Register logic here
    } catch (error) {
        res.redirect('/auth/register');
    }
});

// Logout route
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/posts');
    });
});

module.exports = router;
