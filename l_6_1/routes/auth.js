const {Router} = require('express');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const {validationResult} = require('express-validator');
const nodemailer = require('nodemailer');
const User = require('../models/user');
const keys = require('../keys');
const regEmail = require('../emails/registration');
const {registerValidators} = require('../utils/validators');
const router = Router();

let testEmailAccount = nodemailer.createTestAccount()

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
        user: testEmailAccount.user,
        pass: testEmailAccount.pass
    }
});

router.get('/login', async (req, res) => {
    res.render('auth/login', {
        title: 'Authorization',
        isLogin: true,
        loginError: req.flash('loginError'),
        registerError: req.flash('registerError'),
    });
});

router.get('/logout', async (req, res) => {
    req.session.destroy(() => {
        res.redirect('/auth/login#login');
    });
});

router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;
        const candidate = await User.findOne({email});

        if (candidate) {
            const areSame = await bcrypt.compare(password, candidate.password);

            if (areSame) {
                req.session.user = candidate;
                req.session.isAuthenticated = true;
                req.session.save(err => {
                    if (err) {
                        throw err;
                    }
                    res.redirect('/');
                });
            } else {
                req.flash('loginError', 'Wrong password');
                res.redirect('/auth/login#login');
            }
        } else {
            req.flash('loginError', 'This user do not exist');
            res.redirect('/auth/login#login');
        }
    } catch (e) {
        console.log(e);
    }
    

});

router.get('/register', async (req, res) => {
    res.render('auth/register', {
        title: 'Authorization',
        isLogin: true
    });
});

router.post('/register', registerValidators, async (req, res) => {
    try {
        const {email, password, confirm, name} = req.body;
        const candidate = await User.findOne({email});

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.flash('registerError', errors.array()[0].msg);
            return res.status(422).redirect('/auth/login#register');
        }

        if (candidate) {
            req.flash('registerError', 'User already exists with the same email');
            res.redirect('/auth/login#register');
        } else {
            const hashPassword = await bcrypt.hash(password, 10);
            const user = new User({
                email, name, password: hashPassword, cart: {
                    items: []
                }
            });
            await user.save();
            res.redirect('/auth/login');
            // await transporter.sendMail(regEmail(email));
        }
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;