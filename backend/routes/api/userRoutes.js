const router = require("express").Router();
const userModel = require("../../models/user.js");


router.post("/create", async (req, res) => {
    try {
        const user = new userModel({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
        }); 
        await user.save().then( () => {
            req.session.loggedIn = true;
        }
        );
        res.json({"Status": "Succuss"});
    } catch(err) {
        res.send(err);
    }
});

router.get("/verify", async (req, res) => {
    try {
        userModel.find({}, (err, user) => {
            if (user) {
                res.status(200).json(user);
            } else {
                console.log("Something went wrong");
            }
        })
    } catch (err) {
        console.log(err);
    }
})
module.exports = router;