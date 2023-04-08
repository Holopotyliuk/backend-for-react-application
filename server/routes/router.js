const express = require('express')
const router = express();

const routDashboard = require('./routDashboard')
const routList = require('./routList')
const routTask = require('./routTask');

router.use('/dashboard', routDashboard)
router.use('/lists', routList)
router.use('/tasks', routTask)
module.exports = router;
