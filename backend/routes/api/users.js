const router = require("express").Router();

router.route("/test", (req, res) => {
    res.send("Working at /test");
});

module.exports = router;