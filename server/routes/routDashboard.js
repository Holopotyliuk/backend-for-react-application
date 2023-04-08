const express = require('express')
const controller = require('../controllers/dashboardControllers.js')
const router = express();
router.get('', controller.read)
module.exports = router;