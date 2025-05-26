module.exports = () => {
  const appVariant = process.env.APP_VARIANT || "development";
  return {
    expo: {
      name: "Art Museum",
      slug: "appjs25-update-workshop-code",
      version: "1.0.0",
      orientation: "portrait",
      icon:
        appVariant === "development"
          ? "./assets/images/icon.png"
          : "./assets/images/preview-icon.png",
      scheme: appVariant === "development" ? "myappdev" : "myapp",
      userInterfaceStyle: "automatic",
      splash: {
        image: "./assets/images/splash.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff",
      },
      assetBundlePatterns: ["**/*"],
      ios: {
        supportsTablet: true,
        bundleIdentifier: `com.expo.appjs25updateworkshopcode.${appVariant}`,
        infoPlist: {
          ITSAppUsesNonExemptEncryption: false,
        },
      },
      android: {
        adaptiveIcon: {
          foregroundImage: "./assets/images/adaptive-icon.png",
          backgroundColor: "#ffffff",
        },
        package: `com.expo.appjs25updateworkshopcode.${appVariant}`,
      },
      web: {
        bundler: "metro",
        favicon: "./assets/images/favicon.png",
      },
      plugins: [["expo-router"], "expo-font", "expo-web-browser"],
      experiments: {
        typedRoutes: true,
      },
      runtimeVersion: {
        policy: "appVersion",
      },
      updates: {
        url: "https://u.expo.dev/01d16a23-775b-4185-8d6f-f219b7a3ef00",
      },
      extra: {
        eas: {
          projectId: "01d16a23-775b-4185-8d6f-f219b7a3ef00",
          criticalIndex: 0,
          message: "",
        },
      },
    },
  };
};
