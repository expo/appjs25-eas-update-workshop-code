import IntervalChecker from "@/components/IntervalChecker";
import colors from "@/constants/colors";
import { checkForUpdate, downloadUpdate } from "@/utils/monitorUtils";
import {
  updateInfoDescription,
  currentlyRunningTitle,
  isAvailableUpdateCritical,
  getExpoConfigUpdates,
} from "@/utils/updateUtils";
import { usePersistentDate } from "@/utils/usePersistentDate";
import Updates, { useUpdates, reloadAsync } from "expo-updates";
import {
  ActivityIndicator,
  Button,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as Device from "expo-device";
import { useCallback, useEffect, useState } from "react";

export default function TabThreeScreen() {
  const useUpdatesReturnType = useUpdates();
  const {
    isChecking,
    isDownloading,
    currentlyRunning,
    lastCheckForUpdateTimeSinceRestart,
    isUpdateAvailable,
    isUpdatePending,
    availableUpdate,
  } = useUpdatesReturnType;

  const lastCheckForUpdateTime = usePersistentDate(
    lastCheckForUpdateTimeSinceRestart
  );
  const monitorInterval = 1000 * 10; // 10 seconds
  const isIOSSimulator = Platform.OS === "ios" && !Device.isDevice;

  const [branch, setBranchName] = useState("");

  const updateURLAndRequestHeaders = useCallback(() => {
    const expoConfigUpdates = getExpoConfigUpdates(currentlyRunning.manifest);
    if (!expoConfigUpdates?.url) {
      alert("Unable to determine updateUrl.");
      return;
    }
    Updates.setUpdateURLAndRequestHeadersOverride({
      updateUrl: expoConfigUpdates.url,
      requestHeaders: {
        "expo-channel-name": branch,
      },
    });

    alert("Close and re-open the app to load the latest version.");
  }, [branch, currentlyRunning.manifest]);

  const isUpdateCritical = isAvailableUpdateCritical({
    currentlyRunning,
    availableUpdate,
  });
  const backgroundColor = isUpdateCritical ? "red-600" : "gray-600";

  // If update is critical, download it
  useEffect(() => {
    if (isUpdateCritical && !isUpdatePending) {
      downloadUpdate();
    }
  }, [isUpdateCritical, isUpdatePending]);

  // Run the update (after delay) if download completes successfully and it is critical
  useEffect(() => {
    if (isUpdatePending && isUpdateCritical) {
      setTimeout(() => reloadAsync(), 2000);
    }
  }, [isUpdateCritical, isUpdatePending]);

  let checkingType;
  if (!isIOSSimulator) {
    checkingType = "Background";
  } else {
    checkingType = "Interval Check";
  }

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
          {updateInfoDescription(currentlyRunning, lastCheckForUpdateTime)}
        </Text>
      </View>
      {Boolean(availableUpdate) && (
        <View className={`flex bg-${backgroundColor}`}>
          <View className="flex-row">
            <Text className="flex-1 font-semibold text-3xl px-4 py-2 bg-shade-2">
              Available Update
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
              Type: {isUpdateCritical ? "Critical Update" : "Update"}
              {updateInfoDescription(availableUpdate, lastCheckForUpdateTime)}
            </Text>
          </View>
        </View>
      )}
      <View className="flex-row align-middle">
        <Text className="flex-1 font-semibold text-3xl px-4 py-2 bg-shade-2">
          Monitor
        </Text>
      </View>
      <View className="px-4 gap-y-2 py-2">
        <Text className="text-l">{`Checking method: ${checkingType}`}</Text>
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
      {isIOSSimulator && (
        // background tasks is not supported in iOS simulator so we poll instead
        <IntervalChecker
          lastCheckForUpdateTime={lastCheckForUpdateTime}
          monitorInterval={monitorInterval}
        />
      )}
      <View className="flex-row align-middle">
        <Text className="flex-1 font-semibold text-3xl px-4 py-2 bg-shade-2">
          Changing Update
        </Text>
      </View>
      <View className="px-4 py-2">
        <View className="items-center dark:bg-black p-4">
          <TextInput
            className="w-full max-w-md border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 text-base text-gray-900 dark:text-white bg-white dark:bg-gray-800"
            placeholder="Type branch name..."
            placeholderTextColor="#9ca3af"
            onChangeText={setBranchName}
          />
        </View>
        <Button
          onPress={() => updateURLAndRequestHeaders()}
          title={"Update Branch"}
        />
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
