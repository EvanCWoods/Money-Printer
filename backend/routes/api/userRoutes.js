const router = require("express").Router();
const userModel = require("../../models/user.js");
const Auth = require("../../utils/auth.js");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);



router.post("/create", async (req, res) => {
  try {
    const user = new userModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      customer: {}
    });
    await user.save().then(() => {
      const token = Auth.signToken(user);
      res.send({ Token: token });
    });
  } catch (err) {
    res.send(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    let token = req.query.token;
    const user = await userModel.findOne({ email: req.body.email });
    const isMatch = await user.isCorrectPassword(req.body.password);

    if (user && isMatch) {
      const token = Auth.signToken(user);
      res.status(200).json({ user, token });
    } else {
      res.json({ Data: "Login Invalid" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/success", async (req, res) => {
  try {
    console.log("SERVER 137: ", req.query);
    const session = await stripe.checkout.sessions.retrieve(
      req.query.session_id
    );
    console.log("SERVER 141: ", session);
    const customer = await stripe.customers.retrieve(session.customer);
    console.log("SERVER 143: ", customer);
    res.status(200).send(customer);
  } catch (err) {
    console.log(err);
  }
});

router.post("/getUser", async (req, res) => {
  const user = await userModel.findOne({ email: req.body.email });
  res.status(200).json({ user });
});


module.exports = router;
