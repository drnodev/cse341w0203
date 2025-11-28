const router = require('express').Router();
const students = require('./students');
const courses = require('./courses');
const passport = require('passport');

router.use('/students', students)
router.use('/courses', courses)

router.get('/login', passport.authenticate('github'), (req, res) => { });

router.get('/logout', (req, res) => {
    req.logout(err => {
        if (!err) {
            req.session.user = undefined;
            res.redirect('/');
        }
    });
});

module.exports = router;