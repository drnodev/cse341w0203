const express = require('express');
const router = express.Router();

const { list, byId, create, update, remove } = require('../controllers/students');
const { validateNewStudent, validateUpdateStudent } = require('../middleware/students');
const { isAuthenticated } = require('../middleware/authenticate');



router.get('/', list)
router.get('/:id', byId)
router.post('/', isAuthenticated, validateNewStudent, create);
router.put('/:id', isAuthenticated, validateUpdateStudent, update);
router.delete('/:id', isAuthenticated, remove);

module.exports = router;