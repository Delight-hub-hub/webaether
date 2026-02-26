const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const clientRoutes = require("./routes/clientRoutes");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://aethersystems.co.za"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true
}));
app.use(express.json());
app.use("/api/clients", clientRoutes);

//connect database
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('Welcome to Aether Systems API');
})
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});