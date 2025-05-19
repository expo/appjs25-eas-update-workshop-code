import colors from "@/constants/colors";
import {
  currentlyRunningDescription,
  currentlyRunningTitle,
} from "@/utils/updateUtils";
import { usePersistentDate } from "@/utils/usePersistentDate";
import { useUpdates } from "expo-updates";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function TabThreeScreen() {
  const {
    currentlyRunning,
    isChecking,
    isDownloading,
    lastCheckForUpdateTimeSinceRestart,
  } = useUpdates();

  const lastCheckForUpdateTime = usePersistentDate(
    lastCheckForUpdateTimeSinceRestart,
  );

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
      <>
        <View className="px-4 gap-y-2 py-2">
          <Text className="text-l">
            {currentlyRunningTitle(currentlyRunning)}
            {currentlyRunningDescription(
              currentlyRunning,
              lastCheckForUpdateTime,
            )}
          </Text>
        </View>
      </>
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
