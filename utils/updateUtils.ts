import {
  CurrentlyRunningInfo,
  Manifest,
  UpdateInfo,
  UseUpdatesReturnType,
} from "expo-updates";

export const isInDevelopmentMode = (currentlyRunning: CurrentlyRunningInfo) => {
  return __DEV__ && currentlyRunning.updateId === undefined;
};

export const currentlyRunningTitle = (
  currentlyRunning: CurrentlyRunningInfo
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

export const updateInfoDescription = (
  update: CurrentlyRunningInfo | UpdateInfo,
  lastCheckForUpdateTime?: Date
) => {
  let description =
    ` ID: ${update.updateId}\n` +
    ` Created: ${update.createdAt?.toISOString()}\n`;

  if ("channel" in update) {
    description += ` Channel: ${update.channel}\n`;
  }
  if ("runtimeVersion" in update) {
    description += ` Runtime Version: ${update.runtimeVersion}\n`;
  }

  description +=
    ` Message: ${manifestMessage(update.manifest)}\n` +
    ` Last check: ${lastCheckForUpdateTime?.toISOString()}\n`;

  return description;
};

const getExpoConfigExtra = (manifest?: Partial<Manifest>) => {
  if (manifest && "extra" in manifest) {
    return manifest?.extra?.expoClient?.extra;
  }
};

export const getExpoConfigUpdates = (manifest?: Partial<Manifest>) => {
  if (manifest && "extra" in manifest) {
    return manifest?.extra?.expoClient?.updates;
  }
};

export const isAvailableUpdateCritical = ({
  currentlyRunning,
  availableUpdate,
}: Pick<UseUpdatesReturnType, "currentlyRunning" | "availableUpdate">) => {
  const currentlyRunningExtra = getExpoConfigExtra(currentlyRunning.manifest);
  const criticalIndexCurrent = currentlyRunningExtra?.criticalIndex ?? 0;

  const availableUpdateExtra = getExpoConfigExtra(availableUpdate?.manifest);
  const criticalIndexUpdate = availableUpdateExtra?.criticalIndex ?? 0;

  return criticalIndexUpdate > criticalIndexCurrent;
};
