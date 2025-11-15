const router    = require('express').Router();
const students  = require('./students');
const courses   = require('./courses');


router.use('/students', students)
router.use('/courses', courses)

module.exports = router;