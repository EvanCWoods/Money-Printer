const express = require("express");
const routes = require("./routes");
const mongoConnection = require("./config/connection");
const { MongoClient } = require("mongodb")
const userModel = require("./models/user");
const path = require("path");
const generateApiKey = require("./utils/generateKey");
const dotenv = require("dotenv");

dotenv.config();


const app = express();
const PORT = process.env.PORT || 3001;


// app.use((req, res, next) => {
//   if (req.originalUrl === '/webhook') {
//     next(); // Do nothing with the body because I need it in a raw state.
//   } else {
//     express.json()(req, res, next);  // ONLY do express.json() if the received request is NOT a WebHook from Stripe.
//   }
// });


app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "client/build")));
app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  })
  );

// Uncomment for deployment

const stripe = require("stripe")(process.env.STRIPE_KEY);


app.post("/webhook", async (req, res) => {

  // Check if webhook signing is configured.
  const payload = req.rawBody;
  const signature = req.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_HWS;

  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, signature, endpointSecret);
  } catch (err) {
    console.log(err);
    return;
  }

  // console.log(event.type);
  // console.log(event.data.object);
  // console.log(event.data.object.id);
  const {apiKey, hashedApiKey} = generateApiKey();



// todo: try taking out any event types and firing the api code on webhook firing to get something working.
  switch (event.type) {
    case "checkout.session.completed":
      await userModel.findOneAndUpdate(
        { email: req.body.data.object.customer_details.email },
        {
          customer: {
            id: req.body.data.object.customer,
            subscription: req.body.data.object.subscription,
          },
          apiKey: apiKey
        },
      );
      break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }

  res.status(200).end();
});



app.use(routes);

mongoConnection();

app.use("/images", express.static(path.join(__dirname, "../client/images")));
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.post("/checkout", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: "price_1L9iNMHqRrLitJJQhEnD4yOI",
        quantity: 1,
      },
    ],
    success_url: "http://evan-woods-final-project.herokuapp.com/success",
    success_url:
      "http://evan-woods-final-project.herokuapp.com/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "http://evan-woods-final-project.herokuapp.com/error",
  });
  res.send(session);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Running on port: ${PORT}!`);
});
