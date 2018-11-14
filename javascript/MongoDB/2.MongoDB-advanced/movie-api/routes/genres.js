const { Genre, validate } = require('../models/genre');
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

/* CRUD Operation */
/* Read */
router.get("/", async (req, res) => {
  // Find
  const genres = await Genre.find().sort("name");

  // Response
  res.send(genres);
});

router.get("/:id", async (req, res) => {
  // Find
  const genre = await Genre.findById(req.params.id);
  if (!genre)
    return res
      .status(404)
      .send(`The genre with given ID(${req.params.id}) was not found.`);

  // Response
  res.send(genre);
});

/* Create */
router.post("/", async (req, res) => {
  // Validation test
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  // Save
  let genre = new Genre(req.body);
  genre = await genre.save();

  // Response
  res.send(genre);
});

/* Update */
router.patch("/:id", async (req, res) => {
  // Validation test
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  // Find and Update
  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true } // return new genre
  );

  // Response
  res.send(genre);
});

/* Delete */
router.delete("/:id", async (req, res) => {
  // Find and Delete
  const genre = await Genre.findByIdAndDelete(req.params.id);

  // Response
  res.send(genre);
});

module.exports = router;