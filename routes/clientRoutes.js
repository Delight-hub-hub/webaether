const express = require("express");
const router = express.Router();
const Client = require("../models/\client");

// CREATE client
router.post("/", async (req, res) => {
  try {
    const newClient = new Client(req.body);
    const savedClient = await newClient.save();
    res.status(201).json(savedClient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET all clients
router.get("/", async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;