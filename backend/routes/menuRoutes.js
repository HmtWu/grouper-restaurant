const express = require('express');
const router = express.Router();
// 修正處：這裡必須是 menuController，不能是 dishesController
const controller = require('../controllers/menuController'); 

router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;