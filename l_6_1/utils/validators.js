const {body} = require('express-validator');
const User = require('../models/user');

exports.registerValidators = [
    body('email').isEmail().withMessage('Type correct email')
        .custom(async (value, {req}) => {
            try {
                const user = await User.findOne({ email: value });
                if (user) {
                    return Promise.reject('This email is in base');
                }
            } catch (e) {
                console.log(e);
            }
         })
        .normalizeEmail(),
    body('password', 'Password must be more than 5 symbols').isLength({
        min: 6,
        max: 56
    }).isAlphanumeric().trim(),
    body('confirm').custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error('Passwords have to be same');
        }
        return true;
    }).trim(),
    body('name').isLength({min: 3}).withMessage('Name must be more than 3 symbols').trim(),
];

exports.courseValidators = [
    body('title').isLength({
        min: 3
    }).withMessage('Minimal title length 3 symbols').trim(),
    body('price').isNumeric().withMessage('Enter correct price'),
    body('img').isURL().withMessage('Enter correct image url'),
];