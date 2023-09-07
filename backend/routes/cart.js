const express = require ('express')
const router = express.Router()
const cartCtrl = require('../controllers/cart')

// cart CREATE ROUTE
router.post("/", cartCtrl.createOrUpdate);

module.exports = router