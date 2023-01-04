import express, { Router } from "express";

const router: Router = express.Router();

router.get("/ping", (_req, res) => {
  res.send("pong");
});

export default router;
