import * as TaskManager from "expo-task-manager";
import * as BackgroundTask from "expo-background-task";
import * as Updates from "expo-updates";
import { checkForUpdate } from "@/utils/monitorUtils";

const BACKGROUND_TASK_NAME = "task-run-expo-update";

TaskManager.defineTask(BACKGROUND_TASK_NAME, async () => {
  const update = await Updates.checkForUpdateAsync();
  if (update.isAvailable) {
    await checkForUpdate();
  }
});

export async function registerTask() {
  const isRegistered = TaskManager.isTaskRegisteredAsync(BACKGROUND_TASK_NAME);
  if (!isRegistered) {
    await BackgroundTask.registerTaskAsync(BACKGROUND_TASK_NAME, {
      minimumInterval: 15, // Try to repeat every 15 minutes while backgrounded
    });
  }
}
