const express = require("express");
const router = express.Router();
const { query } = require("../lib/database");

function mapClientRow(row) {
  return {
    _id: String(row.id),
    name: row.name,
    email: row.email,
    phone: row.phone ?? "",
    message: row.message ?? "",
    createdAt: row.created_at,
  };
}

// CREATE client
router.post("/", async (req, res) => {
  try {
    const name = String(req.body?.name ?? "").trim();
    const email = String(req.body?.email ?? "").trim();
    const phone = String(req.body?.phone ?? "").trim() || null;
    const message = String(req.body?.message ?? "").trim();

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required." });
    }

    const savedClient = await query(
      `
        INSERT INTO clients (name, email, phone, message)
        VALUES ($1, $2, $3, $4)
        RETURNING id, name, email, phone, message, created_at
      `,
      [name, email, phone, message]
    );

    res.status(201).json(mapClientRow(savedClient.rows[0]));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET all clients
router.get("/", async (req, res) => {
  try {
    const result = await query(
      `
        SELECT id, name, email, phone, message, created_at
        FROM clients
        ORDER BY created_at DESC
      `
    );

    res.json(result.rows.map(mapClientRow));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
