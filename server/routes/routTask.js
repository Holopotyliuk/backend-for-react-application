const express = require('express')
const controller = require('../controllers/tasksController.js')
const router = express();
router.get('', controller.read)
router.post('', controller.create)
router.patch('', controller.edit)
router.delete('/:id', controller.remove)

module.exports = router;