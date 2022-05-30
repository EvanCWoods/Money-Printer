const router = require("express").Router();
const userModel = require("../../models/user.js");
const Auth = require("../../utils/auth.js");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();


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


// router.post('/webhook', bodyParser.raw({type: 'application/json'}), (request, response) => {
//   const event = request.body;

//   // Handle the event
//   switch (event.type) {
//     case 'payment_intent.succeeded':
//       const paymentIntent = event.data.object;
//       console.log('PaymentIntent was successful!');
//       break;
//     case 'payment_method.attached':
//       const paymentMethod = event.data.object;
//       console.log('PaymentMethod was attached to a Customer!');
//       break;
//     // ... handle other event types
//     default:
//       console.log(`Unhandled event type ${event.type}`);
//   }

//   // Return a 200 response to acknowledge receipt of the event
//   response.json({received: true});
// });



module.exports = router;
