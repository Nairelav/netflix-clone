import { Request, Response } from "express";
import { verifyToken, isAdmin, isAuthorized } from "../services/api";
import { ListType } from "../services/types";

const router = require("express").Router();
const List = require("../models/List");

// -- Create List
router.post("/", verifyToken, async (req: Request, res: Response) => {
  const ListToCreate: ListType = req.body;
  const newList = new List(ListToCreate);

  try {
    const createdList = await newList.save();
    res.status(200).json(createdList);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
});

// -- Delete List
router.delete("/:id", verifyToken, async (req: Request, res: Response) => {
  const id = req.params.id;

  if (isAdmin(req)) {
    try {
      await List.findByIdAndDelete(id);
      res.status(200).json("List has been deleted");
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  } else {
    res.status(401).json("Not authorized");
  }
});

module.exports = router;
