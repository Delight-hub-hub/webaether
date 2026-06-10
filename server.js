const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const clientRoutes = require("./routes/clientRoutes");

const app = express();

const allowedOriginPatterns = [
  /^https?:\/\/(localhost|127\.0\.0\.1)(?::\d+)?$/i,
  /^https:\/\/([a-z0-9-]+\.)*aethersystems\.co\.za$/i,
  /^https:\/\/([a-z0-9-]+\.)*vercel\.app$/i,
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (allowedOriginPatterns.some((pattern) => pattern.test(origin))) {
      return callback(null, true);
    }

    return callback(null, false);
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/clients", clientRoutes);

//connect database
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('Welcome to Aether Systems API');
})

if (require.main === module) {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
