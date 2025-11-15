const express = require('express');
const router  = express.Router();

const { list, byId, create, update, remove } = require('../controllers/students');
const { validateNewStudent, validateUpdateStudent} = require('../middleware/students');



router.get('/'      , list)  
router.get('/:id'   , byId)  
router.post('/'     , validateNewStudent    , create);
router.put('/:id'   , validateUpdateStudent , update);
router.delete('/:id', remove);  

module.exports = router;