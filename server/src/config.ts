import fs from "fs";

const configPath = "./config.json";

type Config = {
  eventDataXMLFolderPath: string;
  eventDataPollFrequencySeconds: number;
  port: number;
  recentSplitsExpirySeconds: number;
  demoMode: boolean;
};

const defaultConfig = {
  eventDataXMLFolderPath: "./event-data/**/*.xml",
  eventDataPollFrequencySeconds: 1,
  port: 4000,
  recentSplitsExpirySeconds: 60,
  demoMode: false,
};

function loadConfigFromDisk(): Config {
  if (!fs.existsSync(configPath)) {
    console.log("config.json not found, creating with defaults");
    fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2));
  }

  let newConfig = defaultConfig;
  try {
    newConfig = JSON.parse(fs.readFileSync("./config.json").toString());
  } catch (e) {
    console.error(e);
    console.error("Failed to load config.json");
    process.exit(1);
  }

  newConfig = {
    ...defaultConfig,
    ...newConfig,
  };

  // fix up formatting & add new default vars to disk
  fs.writeFileSync(configPath, JSON.stringify(newConfig, null, 2));

  // if we are in demo mode, change the eventDataXMLPath every 5 seconds
  if (newConfig.demoMode) {
    console.log("--- DEMO MODE ---");
    let currentExampleFile = 1;
    newConfig.eventDataXMLFolderPath = `${__dirname}/../../demo-data/demo_${
      currentExampleFile + 1
    }/*.xml`;

    setInterval(() => {
      newConfig.eventDataXMLFolderPath = `${__dirname}/../../demo-data/demo_${
        currentExampleFile + 1
      }*.xml`;
      // loop from file 1 to 3 and back around again
      currentExampleFile = (currentExampleFile + 1) % 3;
    }, 5000);
  }

  console.log(`Looking for xml files in ${newConfig.eventDataXMLFolderPath}`);

  return newConfig;
}

export const config = loadConfigFromDisk();
