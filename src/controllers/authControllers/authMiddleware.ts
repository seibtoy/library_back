import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const secretKey = "your_jwt_token";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    console.log("No token provided");
    res.status(403).send("Access denied");
    return;
  }

  jwt.verify(token, "your_jwt_token", (err, decoded) => {
    if (err || !decoded) {
      console.log("Invalid token", err);
      return res.status(403).send("Invalid token");
    }

    const payload = decoded as JwtPayload;
    if (typeof payload === "object" && "userId" in payload) {
      req.userId = payload.userId;
      next();
    } else {
      res.status(403).send("Invalid token structure");
    }
  });
};
