import { Router, Request, Response } from "express";

const routes = Router();

routes.get("/", (_req: Request, res: Response) => {
  res.send("Server is up and running :D");
});

export default routes;
