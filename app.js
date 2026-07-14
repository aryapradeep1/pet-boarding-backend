const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(
    "mongodb://arya:arya2004@ac-rtuowj3-shard-00-00.m6m4y2b.mongodb.net:27017,ac-rtuowj3-shard-00-01.m6m4y2b.mongodb.net:27017,ac-rtuowj3-shard-00-02.m6m4y2b.mongodb.net:27017/labdb?ssl=true&replicaSet=atlas-6j27x5-shard-0&authSource=admin&appName=Cluster0"
  )
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log(error);
  });

// Schema
const petSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    required: true,
    unique: true
  },
  petName: String,
  ownerName: String,
  petType: String,
  ownerPhone: String,
  ownerEmail: String,
  breed: String,
  age: String,
  weight: String,
  checkInDate: String,
  checkOutDate: String,
  vaccinationStatus: String,
  kennelNumber: String
});

const Adding = mongoose.model("PetBooking", petSchema);


app.post("/add-pet", async (req, res) => {
  try {
    if (!req.body.bookingId) {
      return res.json({
        status: "failed",
        message: "Booking ID is required"
      });
    }

    const existing = await Adding.findOne({
      bookingId: req.body.bookingId
    });

    if (existing) {
      return res.json({
        status: "failed",
        message: "Booking ID already exists"
      });
    }

    await Adding.create(req.body);

    res.json({
      status: "success",
      message: "Pet booking added successfully"
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error: error.message
    });
  }
});


app.post("/view-pet", async (req, res) => {
  try {
    const pets = await Adding.find();
    res.json(pets);
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error: error.message
    });
  }
});



app.listen(3000, () => {
  console.log("Server started on port 3000");
});