/* Modules */
const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

/* DB Connect */
mongoose.connect('mongodb://localhost/movie-api', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error(error));

/* Middleware */
app.use(express.json());





/* Model */
const genreSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required : true, 
    minlength: 3, 
    maxlength: 50 
  }
})

const Genre = mongoose.model('Genre', genreSchema);

function validateGenre(genre){
  const schema = {
    name: Joi.string().min(3).max(50).required()
  }
  return Joi.validate(genre, schema);
}


/* Routes */
/* CRUD Operation */
app.get('/api/genres', async (req, res) => {
  // Find
  const genres = await Genre.find().sort('name');

  // Response
  res.send(genres);
})

app.get('/api/genres/:id', async (req, res) => {
  // Find
  const genre = await Genre.findById(req.params.id);
  if(!genre) return res.status(404).send(`The genre with given ID(${req.params.id}) was not found.`)
  
  // Response
  res.send(genre);
})

app.post('/api/genres', async (req,res) => {
  // Validation test
  const { error } = validateGenre(req.body);
  if(error) return res.status(400).send(error.message);

  // Save
  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();

  // Response
  res.send(genre);
})

app.patch('/api/genres/:id', async (req, res) => {
  // Validation test
  const { error } = validateGenre(req.body);
  if(error) return res.status(400).send(error.message);

  // Find and Update
  const genre = await Genre.findByIdAndUpdate(req.params.id, {
    name: req.body.name
  }, { new: true }) // return new genre

  // Response
  res.send(genre);
})



/* Server */
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})