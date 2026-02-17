const express = require("express");

const personController = require('../controllers/personController');
const validatePerson = require("../middlewares/validatePerson");

const router = express.Router();

// index
router.get('/', personController.index)

// store
router.post('/', validatePerson, personController.store)

// delete
router.delete('/:id', personController.deleteItem)


module.exports = router;