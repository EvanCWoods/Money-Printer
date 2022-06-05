const router = require("express").Router();
const userRoutes = require("./userRoutes.js");
const dataRoutes = require("./dataRoutes.js");
const lowTier = require("./lowTier.js");

router.use("/users", userRoutes);
router.use("/data", dataRoutes);
router.use("/data", lowTier);

module.exports = router; 