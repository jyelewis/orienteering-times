import express from "express";
import cors from "cors";
import { getLatestEventsData } from "./eventData";
import { config } from "./config";

export async function startServer() {
  const app = express();

  app.use(cors());

  app.get("/api/healthcheck", (req, res) => res.send("Healthy"));
  app.get("/api/events", (req, res) => res.json(getLatestEventsData()));

  // ui app
  app.use("/", express.static(__dirname + "/../../ui/build"));
  app.get("*", express.static(__dirname + "/../../ui/build/index.html"));

  return new Promise<void>((resolve) => app.listen(config.port, resolve));
}
