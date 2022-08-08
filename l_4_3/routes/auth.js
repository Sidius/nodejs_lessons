const {Router} = require('express');
const User = require('../models/user');
const router = Router();

router.get('/login', async (req, res) => {
    res.render('auth/login', {
        title: 'Authorization',
        isLogin: true
    });
});

router.get('/logout', async (req, res) => {
    req.session.destroy(() => {
        res.redirect('/auth/login#login');
    });
});

router.post('/login', async (req, res) => {
    req.session.user = await User.findById('62e8c76fc7c9692f1d38a368');
    req.session.isAuthenticated = true;
    req.session.save(err => {
        if (err) {
            throw err;
        }
        res.redirect('/');
    });
});

router.get('/register', async (req, res) => {
    res.render('auth/register', {
        title: 'Authorization',
        isLogin: true
    });
});

module.exports = router;