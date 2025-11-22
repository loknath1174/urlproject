import express from "express";
import mongoose from "mongoose";
import User from "./models/User.js";
import Url from "./models/Url.js";
import { nanoid } from "nanoid";

const app = express();
app.use(express.json());
app.use(express.static("public"));


// Basic routes
app.get("/about", (req, res) => {
  res.send("This is about page");
});

app.get("/contact", (req, res) => {
  res.send("This is contact page");
});

// CREATE SHORT URL
app.post("/shorten", async (req, res) => {
  try {
    const { longUrl } = req.body;
    const shortId = nanoid(6);

    const newUrl = await Url.create({
      shortId,
      longUrl,
    });

    res.json({
      message: "URL shortened successfully",
      shortUrl: `http://localhost:5000/${shortId}`,
      data: newUrl,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error creating short URL" });
  }
});

// REDIRECT SHORT URL
app.get("/:shortId", async (req, res) => {
  const { shortId } = req.params;

  const url = await Url.findOne({ shortId });

  if (!url) {
    return res.status(404).json({ message: "URL not found" });
  }

  url.clicks += 1;
  await url.save();

  res.redirect(url.longUrl);
});

// USER CREATE ROUTE
app.post("/create-user", async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await User.create(userData);

    res.json({
      message: "User saved successfully",
      user: newUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error saving user" });
  }
});

// DASHBOARD ROUTE
app.get("/api/urls", async (req, res) => {
  const urls = await Url.find().sort({ createdAt: -1 });
  res.json(urls);
});

// MONGODB CONNECT
mongoose
  .connect(
    "mongodb+srv://Loknath:Loki0711@cluster0.126fj3k.mongodb.net/shortenerdb?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// START SERVER
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
