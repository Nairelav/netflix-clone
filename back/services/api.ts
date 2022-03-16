import { NextFunction, Request, Response } from "express";
const jwt = require("jsonwebtoken");

interface JWTUser {
  id: string;
  isAdmin: boolean;
}

// -- Create TOKEN
export function createToken(infos: JWTUser): string {
  return jwt.sign(infos, process.env.SECRET_KEY, { expiresIn: "5d" });
}

// -- Verify TOKEN
export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.SECRET_KEY, (err: unknown, info: unknown) => {
      if (err) res.status(403).json("Token is not valid !");
      next();
    });
  } else {
    res.status(401).json("Not authenticated");
  }
}

// -- Get Info Token
export function isAdmin(req: Request): boolean {
  const authHeader = req.headers["authorization"];

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    const user: JWTUser = jwt.decode(token);
    return user.isAdmin ? true : false;
  } else {
    return false;
  }
}

// -- Get Info Token
export function isAuthorized(req: Request, id: string): boolean {
  const authHeader = req.headers["authorization"];

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    const user: JWTUser = jwt.decode(token);
    return user.id === id ? true : false;
  } else {
    return false;
  }
}
