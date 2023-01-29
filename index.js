const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userModel = require("./models/user");

const app = express();
app.use(cors());
app.use(bodyParser.json());
mongoose.set("strictQuery", false); //for depreciation warning

const port = process.env.PORT || 3000;

const DB =
  "mongodb+srv://urlunaticguy:souvikdas@cluster0.oruexny.mongodb.net/rndata?retryWrites=true&w=majority";
try {
  mongoose.connect(
    DB,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => console.log("CONNECTED TO DB SUCCESS")
  );
} catch (err) {
  console.log(err);
}

// const postRoutes = require("./routes/userRoutes");
// app.use("/post", postRoutes);

app.get("/post", (request, response) => {
  response.send("WE ARE ON POST HOME OF TYPE GET");
});

app.get("/get/mailCheck", async (request, response) => {
  try {
    console.log(request.body);
    // console.log("HERE IS WHAT I SENT VIA PHONE = ", request.body.email);
    // const savedResult = await userModel.find({
    //   email: JSON.stringify(request.body.email),
    // });
    // console.log(savedResult);
    // response.json(savedResult);
    // console.log(savedResult.data);
    // const arr = savedResult.data;
    // let boolValue = { value: true };
    // for (let i = 0; i < arr.length; i++) {
    //   let mail = arr[i]["email"];
    //   if (mail == request.body.email) {
    //     boolValue.value = false;
    //   }
    //   console.log(mail);
    // }
    // response.json(boolValue);
  } catch (err) {
    console.log(err);
  }
});

app.post("/post/userSignUp", async (request, response) => {
  console.log(request.body);

  const searchEmail = await userModel.find({ email: request.body.email });
  console.log(searchEmail);

  const a = 1;

  const user = new userModel({
    name: request.body.name,
    email: request.body.email,
    password: request.body.password,
    role: "",
    country: "",
    languages: [],
  });

  if (a == 2) {
    try {
      const savedUser = await user.save();
      response.send(savedUser);
    } catch (err) {
      response.status(500).send(err);
    }
  }
});

app.get("/", (req, res) => {
  console.log("Home page called");
  res.send("We are on HOME PAGE of Server.");
});

app.get("/water", (req, res) => {
  console.log("Water page called");
  res.send("Here is your water. Please drink it.");
});

app.listen(port, () => {
  console.log("Server is listening on PORT ", port);
});
