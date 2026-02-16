const express = require("express");

const personController = require('../controllers/personController');

const router = express.Router();

// index
router.get('/', personController.index)

// store
router.post('/', personController.store)

// delete
router.delete('/:id', personController.deleteItem)


module.exports = router;