const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userModel = require("./models/user");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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

app.post("/post/validateCredentials", async (req, res) => {
  console.log(req.body);
  const searchloginEmail = await userModel.find({ email: req.body.loginMail });

  let savedResponse = { boolValue: true, message: "", name: "" };
  if (searchloginEmail.length == 0) {
    console.log("LOGIN FAILED. User is not registered.");
    savedResponse.boolValue = false;
    savedResponse.message = "LOGIN FAILED. User is not registered.";
  } else {
    if (searchloginEmail[0]["password"] == req.body.loginPassword) {
      savedResponse.message = "Login successful";
      savedResponse.name = searchloginEmail[0]["name"];
      console.log("Login successful.");
    } else {
      savedResponse.boolValue = false;
      savedResponse.message = "User exists. Password incorrect.";
      console.log("User exists. Password incorrect.");
    }
  }
  res.send(savedResponse);
});

app.post("/post/userSignUp", async (request, response) => {
  //   console.log(request.body);

  const searchEmail = await userModel.find({ email: request.body.email });
  //   console.log(searchEmail);

  let flag = true;
  if (searchEmail.length == 0) {
    console.log("EMAIL NOT FOUND. Preparing for new user SignUp.");
  } else {
    console.log("EMAIL FOUND. User already exists.");
    flag = false;
    response.send({ value: false });
  }

  if (flag == true) {
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
      response.send({ value: true });
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
