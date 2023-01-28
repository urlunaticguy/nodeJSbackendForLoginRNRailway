const express = require("express");
const router = express.Router();
const userModel = require("../models/user");
const app = express();

app.get("/", (request, response) => {
  response.send("WE ARE ON POST HOME OF TYPE GET");
});

app.post("/userSignUp", async (request, response) => {
  const user = new userModel({
    name: request.body.name,
    email: request.body.email,
    password: request.body.password,
    role: "",
    country: "",
    languages: [],
  });

  try {
    const savedUser = await user.save();
    response.send(savedUser);
  } catch (err) {
    response.status(500).send(err);
  }
});

module.exports = router;
