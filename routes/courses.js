const express = require('express');
const router  = express.Router();

const { list, byId, create, update, remove } = require('../controllers/courses');
const { validateNewCourse, validateUpdateCourse} = require('../middleware/courses');


router.get('/', list)                           
router.get('/:id', byId)                        
router.post('/', validateNewCourse, create);    
router.put('/:id', validateUpdateCourse, update);
router.delete('/:id', remove);  

module.exports = router;