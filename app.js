// this file is for the backend development
import express from "express";
import path from "path";
import mongoose from "mongoose";
const app = express();
import { fileURLToPath } from "url";
import {recommendation_ai} from "./recommendation.js"
import session from "express-session";
const PORT = process.env.PORT || 3001;

// Manually define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/favicon.ico",express.static(path.join(__dirname, "public", "favicon.ico"))
);
// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "d888c1dd6e2794aa5b3462cea9db1632c79eea4ea51d0025a94b85345161d0e8729e892a00ebd3d9c41c9cc7c6255b5a54217da303ffd92afd39eb33d241b7c4",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Set true if using HTTPS
  })
);


mongoose
  .connect(
    "mongodb+srv://priyanshu:Ppriyanshu%401407@priyanshucluster.kzr7x.mongodb.net/TravelMate?retryWrites=true&w=majority&appName=PriyanshuCluster",
    { serverSelectionTimeoutMS: 20000 }
  )
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// scheme for new data in mongoose
const userscheme = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  number: String,
});

// creating model to interact and add items in the collection
const User = mongoose.model("User", userscheme, "logindata");

app.get("/", (req, res) => {
  res.render("index");
});
app.post("/", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send("Email & passord requires");
  }
  // checking the details of the user that he is already present in database
  try {
    const user = await User.findOne({ email: email });
    if (user && user.password === password) {
      req.session.userid = user.id;
      req.session.email=user.email;
      return res
        .status(200)
        .json({ success: true, message: "Login Successfull" });
    } else {
      return res.status(401).json({ success: false, message: "Login Failed" });
    }
  } catch (error) {
    return res.status(400).send("Some error occured");
  }
});
// for signup page
app.get("/signup", (req, res) => {
  res.render("signup");
});
// post request for signup page
app.post("/signup", async (req, res) => {
  const { name, email, password, number } = req.body;
  if (!name && !email && !password && !number) {
    return res.status(400).send("Details required");
  }
  const check_repeat_email = await User.find({ email: email });
  if (check_repeat_email.length > 0) {
    return res
      .status(200)
      .json({ success: false, message: "Email already exists" });
  }
  try {
    const newuser = new User({
      name: name,
      email: email,
      password: password,
      number: number,
    });
    await newuser.save();
    return res.status(200).json({ success: true, message: "Successful" });
  } catch (error) {
    return res.status(400).send("Some error occured");
  }
});

// scheme for home page
const traveller_details = new mongoose.Schema({
  type: String,
  name: String,
  age: Number,
  gender: String,
  departure: String,
  destination: String,
  date: String,
  travel_type:String,
  gender_preference: String,
  communication_preferences: String,
  current_user_id: String,
});
// creating model for the above schema
const traveller = mongoose.model(
  "traveller",
  traveller_details,
  "traveller_details"
);
// function to delete the previous date automaticly
async function deletedate() {
  const date = new Date();
  const today = date.toISOString().split("T")[0];
  await traveller
    .deleteMany({ date: { $lt: today } })
    .then(() => {
      console.log("Date deleted successfully");
    })
    .catch((error) => {
      console.error("Error fetching traveller data:", error);
    });
}

app.get("/home", async (req, res) => {
  // if (req.session.userid) {
  //   await deletedate();
  //   res.render("home");
  // } else {
  //   res.render("protect-home");
  // }
  res.render("home");
});

// for getting the travller details
app.post("/home", async (req, res) => {
  const { type, ...rest } = req.body;

  switch (type) {
    case "popup": {
      const {
        name,
        age,
        gender,
        departure,
        destination,
        date,
        travel_type,
        gender_preference,
        communication_preferences,
      } = rest;

      if (
        !name ||
        !age ||
        !gender ||
        !departure ||
        !destination ||
        !date ||
        !travel_type||
        !gender_preference ||
        !communication_preferences
      ) {
        return res.status(400).send("Unable to fetch data at the moment");
      }
      const new_traveller_exists = await traveller.find({
        name: name,
        age: age,
        gender: gender,
        departure: departure,
        destination: destination,
        date: date,
        travel_type:travel_type,
        gender_preference: gender_preference,
        communication_preferences: communication_preferences,
      });
      if (new_traveller_exists.length > 0) {
        return res
          .status(200)
          .json({ success: false, message: "User already exists" });
      }
      try {
        const new_traveller = new traveller({
          name,
          age,
          gender,
          departure,
          destination,
          date,
          travel_type,
          gender_preference,
          communication_preferences,
          current_user_id:req.session.userid,
        });
        await new_traveller.save();
        return res.status(200).json({ success: true, message: "Successful" });
      } catch (error) {
        return res.status(400).send("Some error occurred");
      }
    }

    
    case "search-box": {
      const { departure, destination, date } = rest;
    
      if (!departure || !destination || !date) {
        return res.status(400).send("Enter valid details");
      }
    
      try {
        const search_users = await traveller.find({ departure, destination });
      
        if (search_users.length > 0) {
          const matchedUsers = search_users.filter((i) => i.date === date);
          if (matchedUsers.length > 0) {
            return res.status(200).json({ message: true, records: matchedUsers,type:"usermatched" });
          }
        }
      
        const recommendedUsers = await recommendation(departure, destination);
      
        if (recommendedUsers.length > 0) {
          return res.status(200).json({ message: true, records: recommendedUsers,type:"AImatched" });
        }
      
        return res.status(200).json({ message: false });
      } catch (error) {
        console.error("Error during search-box processing:", error);
        return res.status(500).send("Internal Server Error");
      }
    }
    

    case "connect-button": {
      const {
        name,
        departure,
        destination,
        date,
        gender,
        gender_preference,
        communication_preferences,
      } = rest;
      if(!name ||
        !departure||
        !destination||
        !date||
        !gender||
        !gender_preference||
        !communication_preferences
      ){
        return res.status(400).send("Unable to fetch data at the moment");
      }
      const findingUser = await traveller.findOne(rest);      
      if (findingUser) {
        // id for the matching traveller
        const findingUserId=findingUser._id;

      }
      // console.log("received data is ",rest)
    }

    default:
      return res.status(400).send("Some unknown error occurred");
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Error logging out");
    }
    res.redirect("/");
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});


// for ai recommendation part
async function recommendation(departure,destination){
  const recommendation_array=await recommendation_ai(departure,destination)
  // console.log(recommendation_array)
  try {
      const search_users = await traveller.find({
        departure: departure,
        destination: { $in: recommendation_array },
      });
      return search_users;
  } catch (error) {
    return res.status(400).send("Some error occurred");
  }
}


// for chatbox
app.post("/chatbox",(req,res)=>{
  if(!req.session.userid){
    return res.status(401).json({error:"Unauthorized"})
  }
  const message=req.body.message
  console.log(message)
  return res.status(200).json({success:true})
})

// for connectbox
app.post("/connect_button",(req,res)=>{
  const connectedUserId=req.body.connect_button
  console.log(`connected user id :${connectedUserId}`)
  console.log(`logged user id :${req.session.userid}`)
  return res.redirect("/home")
})
// schema and models for chatbox
// const message = mongoose.model(
//   "message",
//   message_schema,
//   "message_schema"
// );

// const message_schema = new mongoose.Schema({
// });