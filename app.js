// this file is for the backend development
import express from "express";
import path from "path";
import mongoose from "mongoose";
const app = express();
import { fileURLToPath } from "url";
const PORT = process.env.PORT || 3001;

// for protecting /home directory without login
let check1 = null;
let check2 = null;
// Manually define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use('/favicon.ico', express.static(path.join(__dirname, 'public', 'favicon.ico')));
// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
  check1 = null;
  check2 = null;
  res.render("index");
});
app.post("/", async (req, res) => {
  const { email, password } = req.body;
  if (!email && !password) {
    return res.status(400).send("Email & passord requires");
  }
  // checking the details of the user that he is already present in database
  try {
    const user = await User.findOne({ email: email });
    if (user && user.password === password) {
      check1 = user.email;
      check2 = user.password;
      // res.render("home")
      return res
        .status(200)
        .json({ success: true, message: "Login Successfull" });
    } else {
      return res.status(401).json({ success: false, message: "Login Failed" });
    }
  } catch (error) {
    return res.send(400).send("Some error occured");
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
const traveller_details = new mongoose.Schema({type:String,
  name:String,
  age: Number,
  gender: String,
  departure: String,
  destination: String,
  date: String,
  gender_preference: String,
  communication_preferences: String,
});
// creating model for the above schema
const traveller = mongoose.model(
  "traveller",
  traveller_details,
  "traveller_details"
);
// function to delete the previous date automaticly
async function deletedate(){
  const date=new Date;
  const today=date.toISOString().split("T")[0]
  await traveller.deleteMany({date:{$lt:today}}).then(() => {
        console.log("Date deleted successfully")
    })
    .catch(error => {
      console.error("Error fetching traveller data:", error);
    });
}

app.get("/home",async(req,res)=>{
  if(check1&&check2){
    await deletedate();
    res.render("home")
  }
  else{
    res.render("protect-home")
  }
})

// for getting the travller details
app.post("/home", async (req, res) => {
  const { type, ...rest } = req.body;
  
  switch(type) {
    case "popup": {
      const {
        name,
        age,
        gender,
        departure,
        destination,
        date,
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
        !gender_preference ||
        !communication_preferences
      ) {
        return res.status(400).send("Unable to fetch data at the moment");
      }

      try {
        const new_traveller = new traveller({
          name,
          age,
          gender,
          departure,
          destination,
          date,
          gender_preference,
          communication_preferences,
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
        const search_users = await traveller.find({
          departure: departure,
          destination: destination,
        });

        if (search_users.length > 0) {
          const matchedUsers = search_users.filter(i => i.date === date);

          if (matchedUsers.length > 0) {
            return res.status(200).json({ message: true, records: matchedUsers });
          } else {
            return res.status(200).json({ message: false });
          }
        } else {
          return res.status(200).json({ message: false });
        }
      } catch (error) {
        return res.status(400).send("Some error occurred");
      }
    }

    default:
      return res.status(400).send("Some unknown error occurred");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
