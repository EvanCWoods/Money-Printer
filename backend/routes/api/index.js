const router = require("express").Router();
const userRoutes = require("./userRoutes.js");
const dataRoutes = require("./dataRoutes.js");

router.use("/users", userRoutes);
router.use("/data", dataRoutes);

module.exports = router; 