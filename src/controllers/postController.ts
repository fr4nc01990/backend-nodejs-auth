import { Request, Response, NextFunction } from "express";
import { readFile } from "fs/promises";
import path from "path";

export const addItem = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  console.log("POST request received");
  try {
    // descomentar esto por si queres enviar lo que estamos enviando en el body
    //////////////////////////////////////
    // const request = req.body;
    // console.log("Request body:", req.body);

    // if (!request) {
    //   res.status(400).json({ message: "Request is required" });
    //   return;
    // }
    // res.status(201).json(request);
    /////////////////////////////////////
    const filePath = path.join(__dirname, "../resources/post.json");
    const data = await readFile(filePath, "utf-8");
    res.status(201).json(JSON.parse(data));
  } catch (error) {
    console.error("Error adding item:", error);
    res
      .status(500)
      .json({ message: "An error occurred while adding the item" });
  }
};
