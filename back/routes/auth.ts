import { Request, Response } from "express";
import { UserType } from "../services/types";
import { createToken } from "../services/api";
import { encryptPassword, decryptPassword } from "../services/user";

const router = require("express").Router();
const User = require("../models/User");

// -- Register USER
router.post("/register", async (req: Request, res: Response) => {
  const data = req.body;

  const userData: UserType = {
    username: data.username,
    email: data.email,
    password: encryptPassword(data.password),
  };

  const newUser = new User(userData);

  try {
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
});

// -- Login USER
router.post("/login", async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const user = await User.findOne({ email: data.email });

    !user && res.status(404).json("Wrong email or password !");

    const orignalPassword = decryptPassword(user.password);
    orignalPassword !== data.password && res.status(404).json("Wrong email or password !");

    const accessToken = createToken({ id: user._id, isAdmin: user.isAdmin });
    const { password, ...info } = user._doc;

    res.status(200).json({ ...info, accessToken });
  } catch (error: any) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
