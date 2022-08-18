const {body} = require('express-validator');

exports.registerValidators = [
    body('email').isEmail().withMessage('Type correct email'),
    body('password', 'Password must be more than 5 symbols').isLength({
        min: 6,
        max: 56
    }).isAlphanumeric(),
    body('confirm').custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error('Passwords have to be same');
        }
        return true;
    }),
    body('name').isLength({min: 3}).withMessage('Name must be more than 3 symbols'),
];