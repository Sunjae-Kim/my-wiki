const { Movie, validate } = require('../models/movie');
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

/* CRUD Operation */
/* Read */
router.get("/", async (req, res) => {
  // Find
  const movies = await Movie.find().sort("name");

  // Response
  res.send(movies);
});

router.get("/:id", async (req, res) => {
  // Find
  const movie = await Movie.findById(req.params.id);
  if (!movie)
    return res
      .status(404)
      .send(`The movie with given ID(${req.params.id}) was not found.`);

  // Response
  res.send(movie);
});

/* Create */
router.post("/", async (req, res) => {
  // Validation test
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  // Save
  let movie = new Movie(req.body);
  movie = await movie.save();

  // Response
  res.send(movie);
});

/* Update */
router.patch("/:id", async (req, res) => {
  // Validation test
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  // Find and Update
  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true } // return new genre
  );

  // Response
  res.send(movie);
});

/* Delete */
router.delete("/:id", async (req, res) => {
  // Find and Delete
  const movie = await Movie.findByIdAndDelete(req.params.id);

  // Response
  res.send(movie);
});

module.exports = router;