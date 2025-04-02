const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser")

const app = express();

// CORS Options
const corsOptions = {
  origin: process.env.CLIENT_URL, // Set to the origin of your frontend
  credentials: true,              
};
app.use(cookieParser());
app.use(cors(corsOptions));        // Use CORS middleware
app.use(express.json());           // For parsing JSON
app.options("*", cors(corsOptions));  // Preflight request handler
// app.use(express.urlencoded({ extended: true })); // For parsing URL-encoded data
app.use("/uploads", express.static("uploads"));


// Your routes
app.use("/auth", require("./Routes/authRoutes.js"));
app.use("/api/user", require("./Routes/userRoute.js")) 
app.use("/api/job", require("./Routes/jobRoute.js")) 
app.use("/api/profile", require("./Routes/profileRoute.js")) 
app.use("/api/cat", require("./Routes/catRoute.js")) 
app.use("/api/verify", require("./Routes/monnifyRoute.js"))

const port = process.env.PORT || 6655
const url = process.env.MONGO_URL;

mongoose.connect(url)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.listen(port, () => console.log(`Server running on port ${port}`));


