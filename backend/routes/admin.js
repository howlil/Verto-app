const express = require("express");
const router = express.Router();
const controller = require("../controllers/admin");

router.post("/addAdmin", controller.addAdmin);
router.get("/coba", controller.coba);

module.exports = router;
