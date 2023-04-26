import { Request, Response } from "express";

const users = [
  { id: 1, name: "jean" },
  { id: 2, name: "paul" },
  { id: 3, name: "simon" },
  { id: 4, name: "meiling" },
  { id: 5, name: "kyubong" },
];

export default class UserController {
  public findAll(req: Request, res: Response) {
    try {
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
  public findById(req: Request, res: Response) {
    try {
      const userId = Number(req.params.id);
      const user = users.find((user) => user.id === userId);

      if (!user) res.status(404).json({ error: "Not found" });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
