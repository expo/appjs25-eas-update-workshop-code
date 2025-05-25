import { ExpoConfig, ConfigContext } from "@expo/config";

const appVariant = process.env.APP_VARIANT || "development";

const config = ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "Art Museum",
  //slug: "appjs25-update-workshop-code-[your-username]",
  icon:
    appVariant === "development"
      ? "./assets/images/icon.png"
      : "./assets/images/preview-icon.png",
  scheme: appVariant === "development" ? "myappdev" : "myapp",
  ios: {
    ...config.ios,
    // bundleIdentifier: `com.expo.appjs25updateworkshopcode.[your-username].${appVariant}`,
  },
  android: {
    ...config.android,
    adaptiveIcon: {
      ...config.android?.adaptiveIcon,
      backgroundColor: appVariant === "development" ? "#FFFFFF" : "#7bd4d6",
    },
    // package: `com.expo.appjs25updateworkshopcode.[your-username].${appVariant}`,
  },
});

export default config;
