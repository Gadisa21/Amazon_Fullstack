const express = require("express");
const cors = require("cors");

const stripe = require("stripe")(process.env.STRIPE_KEY);
require("dotenv").config();
const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  const total = parseInt(request.query.total, 10);
  console.log("payment requested recieved for this amount >>>", total);
  const paymentIntent = await stripe?.paymentIntents?.create({
    amount: total,
    currency: "usd",
  });

  response.status(201).send({
    clientSecret: paymentIntent?.client_secret,
  });
});
app.listen(8080, (err) => {
  if (err) throw err;
  console.log("app is running on por 8080.");
});
