const express = require('express');
const cors = require('cors');
require('dotenv').config();
const clientRoutes = require("./routes/clientRoutes");
const { query } = require("./lib/database");

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

const hasDatabaseConnectionString =
  Boolean(process.env.DATABASE_URL?.trim()) ||
  Boolean(process.env.POSTGRES_URL?.trim()) ||
  Boolean(process.env.SUPABASE_DATABASE_URL?.trim());

if (hasDatabaseConnectionString) {
  query('SELECT 1')
    .then(() => console.log("PostgreSQL Connected"))
    .catch((err) => console.log(err));
} else {
  console.warn('PostgreSQL connection string is not configured yet.');
}

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
