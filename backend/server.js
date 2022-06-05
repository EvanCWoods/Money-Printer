const express = require("express");
const routes = require("./routes");
const mongoConnection = require("./config/connection");
const { MongoClient } = require("mongodb")
const userModel = require("./models/user");
const path = require("path");
const generateApiKey = require("./utils/generateKey");


const app = express();
const PORT = process.env.PORT || 3001;

// app.use(URLConfig.URL_API + '/webhooks-stripe', express.raw({ type: 'application/json' }), WebHooksRoutes)
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "client/build")));
app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  })
);
app.use(routes);

mongoConnection();

// Uncomment for deployment

app.use("/images", express.static(path.join(__dirname, "../client/images")));
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const stripe = require("stripe")(process.env.STRIPE_KEY);

app.post("/webhook", async (req, res) => {
  // const event = req.body;
  // console.log(event.type);
  // console.log(event.data.object);
  // console.log(event.data.object.id);
  // let data;
  // let eventType;

  // Check if webhook signing is configured.
  const payload = req.rawBody;
  const signature = req.headers["stripe-signature"];
  const enpointSecret =
    "whsec_RAVhsPce8S4eGPYwDL2XhUqFN5B2JdJh";

  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, signature, enpointSecret);
  } catch (err) {
    console.log(err);
    return;
  }

  // console.log(event.type);
  // console.log(event.data.object);
  // console.log(event.data.object.id);
  const {apiKey, hashedApiKey} = generateApiKey();

  switch (event.type) {
    case "checkout.session.completed":
      console.log(req.body.data);
      const customerId = req.body.data.object.customer;
      const subscriptionId = req.body.data.object.subscription;
      console.log(customerId, subscriptionId);

      // const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true });
      // await client.connect();
      // const cursor = client.db("users").collection("api_keys");

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


      // const currentUser = await userModel.findOne(
      //   { email: req.body.data.object.customer_details.email })
      
      // const apiData = {hashedApiKey: currentUser._id}
      // cursor.insertOne(apiData);

      break;
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object;
      // console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
      // console.log(paymentIntent);
      // Then define and call a method to handle the successful payment intent.
      // handlePaymentIntentSucceeded(paymentIntent);
      break;
    case "payment_method.attached":
      const paymentMethod = event.data.object;
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }

  res.status(200);
});

app.post("/checkout", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: "price_1L2YLHG2lSfGD3plFg9KXqvk",
        quantity: 1,
      },
    ],
    success_url: "http://test-deployment-fp.herokuapp.com/success",
    success_url:
      "http://test-deployment-fp.herokuapp.com/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "http://test-deployment-fp.herokuapp.com/error",
  });
  res.json(session);
});

app.get("/success", async (req, res) => {
  try {
    console.log("SERVER 137: ", req.query);
    const session = await stripe.checkout.sessions.retrieve(
      req.query.session_id
    );
    console.log("SERVER 141: ", session);
    const customer = await stripe.customers.retrieve(session.customer);
    console.log("SERVER 143: ", customer);
    res.status(200).json(customer);
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => {
  console.log(`Running on port: ${PORT}!`);
});
