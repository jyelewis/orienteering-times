import { startServer } from "./server";
import { watchLiveEventData } from "./eventData";
import { config } from "./config";

async function main() {
  // start polling the event file
  watchLiveEventData();

  await startServer();
  console.log("Edit config.json & restart server to configure xml path & port");
  console.log(`Orienteering server listening on port ${config.port}`);
}

main().catch(console.error);
