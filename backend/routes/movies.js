const router = require("express").Router();
const Movie = require("../models/Movie");
const verify = require("../verifyToken");
const Genre = require("../models/Genre");
const { json } = require("express");
router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newMovie = new Movie(req.body);
    try {
      const savedMovie = await newMovie.save();
      res.status(200).json(savedMovie);
    } catch (error) {
      res.status(500).json(error);
    }
  }
});
router.get("/",verify,async (req,res)=>{
  if(req.user.isAdmin){
    try {
      const movies = await Movie.find();
      res.status(200).json(movies.reverse());
    } catch (error) {
      res.status(500).json(error);
    }
  }
})

router.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedMovie);
    } catch (error) {
      res.status(500).json(error);
    }
  }
});
router.get("/popular", async (req, res) => {
  try {
    const popularMovie = await Movie.find().sort({ popularity: -1 }).limit(10);
    res.status(200).json(popularMovie);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/newest/", async (req, res) => {
  const page = req.query.page || 1;
  try {
    const popularMovie = await Movie.find().sort({ release_date: -1 }).skip((page - 1) * 12).limit(12);
    res.status(200).json(popularMovie);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/top_rated", async (req, res) => {
  try {
    const popularMovie = await Movie.find().sort({ vote_average: 1 }).limit(12);
    res.status(200).json(popularMovie);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/genre/:genre", async (req, res) => {
  try {
    const genre = await Genre.findOne({ name: new RegExp(req.params.genre, 'i') });
    const genreMovies = await Movie.find({
      genre_ids: { $in: Number(genre.id) },
    }).limit(12);
    res.status(200).json(genreMovies);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
      console.log(deletedMovie);
      res.status(200).json(deletedMovie);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
});
router.post("/getlist", async (req, res) => {
  try {
    let movie;
    const { ids } = req.body;
    if (ids) {
      movie = await Promise.all(
        ids.map(async (id) => {
          return await Movie.findOne({ id: id });
        })
      );
      res.status(200).json(movie);
      console.log(movie);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
router.get("/:id", verify, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.status(200).json(movie);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
