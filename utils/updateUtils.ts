import { CurrentlyRunningInfo } from "expo-updates";

export const isInDevelopmentMode = (currentlyRunning: CurrentlyRunningInfo) => {
  return __DEV__ && currentlyRunning.updateId === undefined;
};

export const currentlyRunningTitle = (
  currentlyRunning: CurrentlyRunningInfo,
) => {
  if (isInDevelopmentMode(currentlyRunning)) {
    return "Type: Dev Mode (usage limited to extension tab)\n";
  }
  return currentlyRunning?.isEmbeddedLaunch
    ? "Type: Embedded Bundle\n"
    : "Type: Update\n";
};

const manifestMessage = (manifest: any) => {
  return manifest?.extra?.expoClient?.extra?.message ?? "";
};

export const currentlyRunningDescription = (
  currentlyRunning: CurrentlyRunningInfo,
  lastCheckForUpdateTime?: Date,
) => {
  return (
    ` ID: ${currentlyRunning.updateId}\n` +
    ` Created: ${currentlyRunning.createdAt?.toISOString()}\n` +
    ` Channel: ${currentlyRunning.channel}\n` +
    ` Runtime Version: ${currentlyRunning.runtimeVersion}\n` +
    ` Message: ${manifestMessage(currentlyRunning.manifest)}\n` +
    ` Last check: ${lastCheckForUpdateTime?.toISOString()}\n`
  );
};
