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
router.delete("/:id", verifyToken, async (req: Request, res: Response) => {
  const id = req.params.id;

  if (isAdmin(req) || isAuthorized(req, id)) {
    try {
      await User.findByIdAndDelete(id);
      res.status(200).json("User has been deleted");
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  } else {
    res.status(401).json("Not authorized");
  }
});

// -- Get User
router.get("/find/:id", verifyToken, async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);
    const { password, isAdmin, ...info } = user._doc;
    res.status(200).json(info);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
});

// -- Get All User
router.get("/", verifyToken, async (req: Request, res: Response) => {
  const query = req.query.new;
  try {
    const users = query ? await User.find().limit(10) : await User.find();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
});

// -- Get User Stats
// router.get("/stats", verifyToken, async (req: Request, res: Response) => {
//   const today = new Date();

//   const lastYear = today.setFullYear(today.setFullYear() - 1);
//   const monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

//   try {
//     const data = await User.aggregate([
//       {
//         $project: {
//           month: { $month: "$createdAt" },
//         },
//       },
//       {
//         $group: {
//           _id: "$month",
//           total: { $sum: 1 },
//         },
//       },
//     ]);
//     res.status(200).json(data);
//   } catch (error: any) {
//     res.status(500).json(error.message);
//   }
// });

module.exports = router;
