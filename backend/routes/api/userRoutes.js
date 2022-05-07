const router = require("express").Router();
const userModel = require("../../models/user.js");


router.post("/create", async (req, res) => {
    console.log(req.body);
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

router.get("/login", (req, res) => {
    if (req.session.loggedIn == true) {
        res.status(200).json("Already Logged In");
    }
})
module.exports = router;