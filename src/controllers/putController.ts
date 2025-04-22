import { NextFunction, Request, Response } from "express";
import { readFile, writeFile } from "fs/promises";
import path from "path";

export const updateItem = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  console.log("PUT request received");
  try {
    const filePath = path.join(__dirname, "../resources/put.json");
    const data = await readFile(filePath, "utf-8");
    res.status(200).json(JSON.parse(data));
  } catch (error) {
    console.error("Error updating item:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the item" });
  }
};
