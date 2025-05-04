import { Router } from "express";
import { Request, Response } from "express";
import z from "zod";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const client = new PrismaClient();

const routes = Router();

routes.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const userSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(20),
  });
  const result = userSchema.safeParse({ email, password });
  if (!result.success) {
    res.status(400).json(result.error.format());
    return;
  }
  const user = await client.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }
  const token2 = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
    expiresIn: "8h",
  });
  res.json({ token2 });
});
routes.post("/register", async (req: Request, res: Response) => {
  const { username, password, email } = req.body;
  const userSchema = z.object({
    username: z.string().min(3).max(20),
    password: z.string().min(6).max(20),
  });

  const user1 = await client.user.findUnique({
    where: {
      username,
      email,
    },
  });
  if (user1) {
    res.status(400).json({ error: "User already exists" });
    return;
  }
  const pass = await bcrypt.hash(password, 10);

  const result = userSchema.safeParse({ username, password });
  if (!result.success) {
    res.status(400).json(result.error.format());
    return;
  }

  client.user
    .create({
      data: {
        username,
        password: pass,
        email,
      },
    })
    .then((user: any) => {
      res.json(user);
    })
    .catch((error: Error) => {
      res.status(500).json({ error: error.message });
    });
});

export default routes;
