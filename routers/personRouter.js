const express = require("express");
require("../models/User");
require("../models/Birthday");

const personController = require('../controllers/personController');
const validatePerson = require("../middlewares/validatePerson");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// index
router.get('/', authMiddleware, personController.index)

// store
router.post('/', authMiddleware, validatePerson, personController.store)

// delete
router.delete('/:id', authMiddleware, personController.deleteItem)

//update
router.put("/:id", authMiddleware, personController.update);


module.exports = router;