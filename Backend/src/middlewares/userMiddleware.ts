import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const userMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      res.status(401).json({
        message: "Authorization header is missing",
      });
      return;
    }
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7) // Remove "Bearer " prefix (7 characters)
      : authHeader; // For backward compatibility, also accept just the token

    const decode = jwt.verify(token, process.env.JWT_SECRET!);

    if (decode) {
      if (typeof decode === "string") {
        res.json({
          message: "something is wrong with decode",
        });
        return;
      }
      req.userId = (decode as JwtPayload).id;
      next();
    } else {
      res.json({
        message: "soemthing is wrong decode is not present",
      });
    }
  } catch (e) {
    res.json({
      message: "Everthing is wrong",
    });
    return;
  }
};
