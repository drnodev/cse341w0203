const express = require('express');
const router = express.Router();

const { list, byId, create, update, remove } = require('../controllers/courses');
const { validateNewCourse, validateUpdateCourse } = require('../middleware/courses');
const { isAuthenticated } = require('../middleware/authenticate');


router.get('/', list)
router.get('/:id', byId)
router.post('/', isAuthenticated, validateNewCourse, create);
router.put('/:id', isAuthenticated, validateUpdateCourse, update);
router.delete('/:id', isAuthenticated, remove);

module.exports = router;