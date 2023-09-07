const express = require ('express')
const router = express.Router()
const cartCtrl = require('../controllers/cart')

// cart CREATE ROUTE
router.post("/", cartCtrl.create);

// cart UPDATE ROUTE
router.put("/:id", cartCtrl.update);


module.exports = router