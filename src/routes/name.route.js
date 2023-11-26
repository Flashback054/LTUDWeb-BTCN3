const express = require("express");
const router = express.Router();

const nameController = require("../controllers/name.controller");

router.get("/", nameController.getAllNames);
router.get("/:id", nameController.getNameById);
router.get("/search/:searchStr", nameController.getNameBySearch);

module.exports = router;
