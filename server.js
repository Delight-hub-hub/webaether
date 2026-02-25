const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const clientRoutes = require("./routes/clientRoutes");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://aether-frontend-rho.vercel.app"
];


//middleware
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
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