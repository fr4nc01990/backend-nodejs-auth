import { Request, Response } from "express";
import { readFile } from "fs/promises";
import path from "path";

export const getJsonData = async (req: Request, res: Response) => {
  console.log("GET request received");
  try {
    const filePath = path.join(__dirname, "../resources/getAll.json");
    const data = await readFile(filePath, "utf-8");
    res.json(JSON.parse(data));
  } catch (error) {
    console.error("Error reading JSON file:", error);
    res.status(500).json({ message: "Error reading data file" });
  }
};
