import { Request, Response } from "express";
import { verifyToken, isAdmin, isAuthorized } from "../services/api";
import { MovieType } from "../services/types";

const router = require("express").Router();
const Movie = require("../models/Movie");

// -- Create Movie
router.post("/", verifyToken, async (req: Request, res: Response) => {
  const movieToCreate: MovieType = req.body;
  const newMovie = new Movie(movieToCreate);

  try {
    const createdMovie = await newMovie.save();
    res.status(200).json(createdMovie);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
});

// -- Update Movie
router.put("/:id", verifyToken, async (req: Request, res: Response) => {
  const id = req.params.id;

  if (isAdmin(req)) {
    const data = req.body;

    try {
      const updatedMovie = await Movie.findByIdAndUpdate(id, { $set: data });
      res.status(200).json(updatedMovie);
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  } else {
    res.status(401).json("Not authorized");
  }
});

// -- Delete Movie
router.delete("/:id", verifyToken, async (req: Request, res: Response) => {
  const id = req.params.id;

  if (isAdmin(req)) {
    try {
      await Movie.findByIdAndDelete(id);
      res.status(200).json("Movie has been deleted");
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  } else {
    res.status(401).json("Not authorized");
  }
});

// -- Get Movie
router.get("/find/:id", verifyToken, async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const movie = await Movie.findById(id);
    res.status(200).json(movie._doc);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
});

// -- Get Random Movie
router.get("/random", verifyToken, async (req: Request, res: Response) => {
  const type = req.query.type;
  let movieRandom: MovieType;

  try {
    if (type === "serie") {
      movieRandom = await Movie.aggregate([{ $match: { isSeries: true } }, { $sample: { size: 1 } }]);
    } else {
      movieRandom = await Movie.aggregate([{ $match: { isSeries: false } }, { $sample: { size: 1 } }]);
    }

    res.status(200).json(movieRandom);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
});

// -- Get All Movie
router.get("/", verifyToken, async (req: Request, res: Response) => {
  const query = req.query.new;
  try {
    const Movies = query ? await Movie.find().limit(10) : await Movie.find();
    res.status(200).json(Movies);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
