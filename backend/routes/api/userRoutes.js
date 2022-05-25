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

router.post("/checkout", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: "price_1L2YLHG2lSfGD3plFg9KXqvk",
        quantity: 1
      }
    ],
    success_url: "http://localhost:3000/success",
    success_url: "http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "http://localhost:3000/error"
  });
  res.send(session);
});

router.get("/success", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
    const customer = await stripe.customers.retrieve(session.customer);

    res.send(customer);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});


module.exports = router;
