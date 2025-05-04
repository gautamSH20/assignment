import { Router } from "express";
import { Request,Response } from "express";
import z from "zod";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userMiddleware } from "../middlewares/userMiddleware";
const client= new PrismaClient();

const taskRoutes = Router();


const createTaskSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    status: z.string().default("pending"),
    tags: z.string().default(""),
    recurrence: z.array(z.object({
      frequency: z.string(),
      interval: z.number().positive(),
      startDate: z.string().transform(str => new Date(str)),
      endDate: z.string().optional().transform(str => str ? new Date(str) : undefined)
    })).optional().default([])
  });


  taskRoutes.post("/create", userMiddleware, async (req: Request, res: Response) => {
    try {
      // Validate request body
      const validationResult = createTaskSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        res.status(400).json({ 
          error: "Validation failed", 
          details: validationResult.error.errors 
        });
        return;
      }
      
      const { title, description, status, tags, recurrence } = validationResult.data;
      
      
      // Create task in database
      const newTask = await client.task.create({
        data: {
          title,
          description,
          status,
          tags,
          //@ts-ignore
          userId: req.userId, 
          // Create recurrence patterns if provided
          recurrence: {
            create: recurrence.map(rec => ({
              frequency: rec.frequency,
              interval: rec.interval,
              startDate: rec.startDate,
              endDate: rec.endDate
            }))
          }
        },
        // Include recurrence in the response
        include: {
          recurrence: true
        }
      });
      
     res.status(201).json({
        message: "Task created successfully",
        task: newTask
      });
    return;  
    } catch (error) {
      console.error("Error creating task:", error);
       res.status(500).json({ error: "Internal server error" });
       return;
    }
  });

  taskRoutes.get("/getAll",userMiddleware, async (req: Request, res: Response) => {
    try {
      // Fetch all tasks for the authenticated user
      const tasks = await client.task.findMany({
        where: {
          //@ts-ignore
          userId: req.userId
        },
        include: {
          recurrence: true  
        }
      });
      res.status(200).json({
        message: "Tasks fetched successfully",
        tasks
      });
      return;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
  });

  taskRoutes.delete("/delete/:id", userMiddleware, async (req: Request, res: Response) => {
    const taskId = parseInt(req.params.id);
    if (isNaN(taskId)) {
      res.status(400).json({ error: "Invalid task ID" });
      return;
    }
    try {
      // Check if the task exists and belongs to the user
      const task = await client.task.findUnique({
        where: {
          id: taskId,
        },
        select: {
          userId: true,
        },
      });
      if (!task) {
         res.status(404).json({ error: "Task not found" });
         return;
      }
      //@ts-ignore
      if (task.userId !== req.userId) {
         res.status(403).json({ error: "You do not have permission to delete this task" });
         return;
      }
      // Delete the task
      await client.task.delete({
        where: {
          id: taskId,     
        },
      });
      res.status(200).json({ message: "Task deleted successfully" });
      return;
    } catch (error) {
      console.error("Error deleting task:", error);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
  });

  taskRoutes.put("/update/:id", userMiddleware, async (req: Request, res: Response) => {
    const taskId = parseInt(req.params.id);
    if (isNaN(taskId)) {
      res.status(400).json({ error: "Invalid task ID" });
      return;
    }
    try {
      // Validate request body
      const validationResult = createTaskSchema.safeParse(req.body);
      if (!validationResult.success) {
        res.status(400).json({ 
          error: "Validation failed", 
          details: validationResult.error.errors 
        });
        return;
      }
      const { title, description, status, tags, recurrence } = validationResult.data;
      
      // Check if the task exists and belongs to the user
      const task = await client.task.findUnique({
        where: {
          id: taskId,
        },
        select: {
          userId: true,
        },
      });
      if (!task) {
         res.status(404).json({ error: "Task not found" });
         return;
      }
      //@ts-ignore
      if (task.userId !== req.userId) {
         res.status(403).json({ error: "You do not have permission to update this task" });
         return;
      }
      
      // Update the task
      const updatedTask = await client.task.update({
        where: {
          id: taskId,
        },
        data: {
          title,
          description,
          status,
          tags,
          recurrence: {
            deleteMany: {}, // Delete existing recurrence patterns
            create: recurrence.map(rec => ({
              frequency: rec.frequency,
              interval: rec.interval,
              startDate: rec.startDate,
              endDate: rec.endDate
            }))
          }
        },
        include: {
          recurrence: true  
        }
      });
      
     res.status(200).json({
        message: "Task updated successfully",
        task: updatedTask
      });
    return;  
    } catch (error) {
      console.error("Error updating task:", error);
       res.status(500).json({ error: "Internal server error" });
       return;
    }
  });

  export default taskRoutes;