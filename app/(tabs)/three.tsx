import colors from "@/constants/colors";
import { dateDifferenceInMilliSeconds } from "@/utils/dateUtils";
import { checkForUpdate, downloadUpdate } from "@/utils/monitorUtils";
import {
  currentlyRunningDescription,
  currentlyRunningTitle,
} from "@/utils/updateUtils";
import { useAppState } from "@/utils/useAppState";
import { useInterval } from "@/utils/useInterval";
import { usePersistentDate } from "@/utils/usePersistentDate";
import { useUpdates, reloadAsync } from "expo-updates";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function TabThreeScreen() {
  const useUpdatesReturnType = useUpdates();
  const {
    isChecking,
    isDownloading,
    currentlyRunning,
    lastCheckForUpdateTimeSinceRestart,
    isUpdateAvailable,
    isUpdatePending,
  } = useUpdatesReturnType;

  const lastCheckForUpdateTime = usePersistentDate(
    lastCheckForUpdateTimeSinceRestart
  );

  const monitorInterval = 1000 * 10; // 10 seconds
  // Check if needed when app becomes active
  const appStateHandler = (activating: boolean) => {
    if (activating) {
      checkForUpdate();
    }
  };
  const appState = useAppState(appStateHandler);
  const needsUpdateCheck = () =>
    dateDifferenceInMilliSeconds(new Date(), lastCheckForUpdateTime) >
    monitorInterval;

  // This effect runs periodically to see if an update check is needed
  // The effect interval should be smaller than monitorInterval
  useInterval(() => {
    if (appState === "active" && needsUpdateCheck() && !__DEV__) {
      checkForUpdate();
    }
  }, monitorInterval / 4);

  return (
    <View className="flex-1 bg-shade-1">
      <View className="flex-row align-middle">
        <Text className="flex-1 font-semibold text-3xl px-4 py-2 bg-shade-2">
          Current Update
        </Text>
        {isChecking || isDownloading ? (
          <ActivityIndicator
            style={styles.activityIndicator}
            size="large"
            color={colors.tint}
          />
        ) : null}
      </View>
      <View className="px-4 gap-y-2 py-2">
        <Text className="text-l">
          {currentlyRunningTitle(currentlyRunning)}
          {currentlyRunningDescription(
            currentlyRunning,
            lastCheckForUpdateTime
          )}
        </Text>
      </View>
      <View className="flex-row align-middle">
        <Text className="flex-1 font-semibold text-3xl px-4 py-2 bg-shade-2">
          Monitor
        </Text>
      </View>
      <View className="px-4 gap-y-2 py-2">
        <Button
          onPress={() => checkForUpdate()}
          disabled={isChecking || isDownloading}
          title={
            isChecking ? "Checking for update..." : "Manually check for update"
          }
        />
        {isUpdateAvailable && (
          <Button
            onPress={() => downloadUpdate()}
            disabled={isDownloading}
            title={"Download update"}
          />
        )}
        {isUpdatePending && (
          <Button
            onPress={() => setTimeout(() => reloadAsync(), 2000)}
            title={"Launch update"}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  activityIndicator: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  titleStyle: {
    padding: 16,
    fontSize: 20,
    color: "white",
    backgroundColor: "green",
  },
  imageContainerStyle: {
    flex: 1,
    flexDirection: "column",
    margin: 1,
  },
  imageStyle: {
    height: 120,
    width: "100%",
  },
  fullImageStyle: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "98%",
    resizeMode: "contain",
  },
  modelStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  closeButtonStyle: {
    width: 25,
    height: 25,
    top: 50,
    right: 20,
    position: "absolute",
  },
});
