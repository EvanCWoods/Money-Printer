const express = require("express");
const routes = require("./routes");
const mongoConnection = require("./config/connection");
const userModel = require("./models/user");
const path = require("path");

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
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

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
    "whsec_5384c10cc158ecdd9c3c4e0029355341c9f2b1fa5206edf288a964672f7fa48b";

  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, signature, enpointSecret);
  } catch (err) {
    console.log(err);
    return;
  }

  console.log(event.type);
  console.log(event.data.object);
  console.log(event.data.object.id);

  res.sendStatus(200);
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
    success_url: "http://localhost:3000/success",
    success_url:
      "http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "http://localhost:3000/error",
  });
  res.send(session);
});

app.get("/success", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(
      req.query.session_id
    );
    const customer = await stripe.customers.retrieve(session.customer);
    await userModel.findOneAndUpdate(
      { email: customer.email },
      {
        customer: {
          id: customer.id,
          invoice_prefix: customer.invoice_prefix,
        },
      }
    );
    res.send(customer);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

app.listen(PORT, () => {
  console.log(`Running on port: ${PORT}!`);
});
