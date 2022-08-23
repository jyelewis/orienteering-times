import express from "express";
import cors from "cors";
import { getLatestEventData } from "./eventData";
import { config } from "./config";

export async function startServer() {
  const app = express();

  app.use(cors());

  app.get("/api/healthcheck", (req, res) => res.send("Healthy"));
  app.get("/api/event-data", (req, res) => res.json(getLatestEventData()));

  // ui app
  app.use("/", express.static(__dirname + "/../../ui/build"));
  app.get("*", express.static(__dirname + "/../../ui/build/index.html"));

  return new Promise<void>((resolve) => app.listen(config.port, resolve));
}
