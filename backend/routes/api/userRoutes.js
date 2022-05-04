const router = require("express").Router();

router.get("/", (req, res) => {
    res.send("Working at /");
});

module.exports = router;