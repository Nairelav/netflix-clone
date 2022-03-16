import { Request, Response } from "express";
import { UserType } from "../services/types";
import { verifyToken, isAdmin, isAuthorized } from "../services/api";
import { encryptPassword } from "../services/user";

const router = require("express").Router();
const User = require("../models/User");

// -- Update User
router.put("/:id", verifyToken, async (req: Request, res: Response) => {
  const id = req.params.id;

  if (isAdmin(req) || isAuthorized(req, id)) {
    const data = req.body;

    if (data.password) data.password = encryptPassword(data.password);

    try {
      const updatedUser = await User.findByIdAndUpdate(id, { $set: data });
      res.status(200).json(updatedUser);
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  } else {
    res.status(401).json("Not authorized");
  }
});

// -- Delete User

// -- Get User

// -- Get All User

// -- Get User Stats

module.exports = router;
