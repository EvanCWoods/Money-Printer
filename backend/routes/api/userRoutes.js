const router = require("express").Router();
const userModel = require("../../models/user.js");


router.post("/create", async (req, res) => {
    try {
        const user = new userModel({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            subscription: req.body.subscription,
        }); 
        await user.save();
        res.json({"Status": "Succuss", "Created user": user});
    } catch(err) {
        res.send(err);
    }
});

module.exports = router;