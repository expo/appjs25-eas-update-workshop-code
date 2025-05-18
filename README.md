# App.js 2025: "Production-ready Patterns for EAS Update" starter project

Reference code for the workshop.

## Prerequisites

- A local development environment ready for native iOS and Android React Native / Expo development, capable of running the `npx expo run:ios` and `npx expo run:android`, including recent versions of:
  - Xcode (version 15+)
  - Watchman
  - Cocoapods
  - JDK 17
  - Android Studio
  - iOS simulator
  - Android emulator
  - If you're not sure if you have all of these or if you have the right versions, check the [Expo Local App Development requirements](https://docs.expo.dev/guides/local-app-development/) for details on how to install these tools in order to enable local native development with the Expo CLI.
- Other general development tools:
  - Node 20+
  - Visual Studio Code
  - Git (Github Desktop works great)
- Hardware:
  - A Mac is highly recommended for the full experience (though all exercises have an Android-only track, so it's possible to do most of the exercises without a Mac).
- Online accounts:
  - An Expo account (go to https://expo.dev to sign up)

## Test your setup before the workshop

Do these steps to ensure you'll be able to complete the workshop exercises.

1. Fork and clone this repo.

2. Install dependencies with

```
yarn install
```

3. Install EAS CLI globally with

```
npm install -g eas-cli
```

3. Install EAS CLI globally with

```
npm install -g eas-cli
```

4. Log in to your Expo account with

```
eas login
```

5. Configure your EAS project to use EAS Build and EAS Update

```
eas build:configure # Choose the option to configure all platforms
eas update:configure
```

6. Run and install the appropriate build command based on your setup:

### Option 1: You have an iOS device and an active Apple Developer account ($99/year membership)

→ Build a development version for your iOS device:

Change the iOS bundle identifier in `app.json` to something unique (e.g. `com.expo.appjs25-update-workshop-code.your-name`) and run:

```
eas build --platform ios --profile development
```

Once the build is complete, follow the instructions on the website to install the app.

### Option 2: You have a Mac

→ Build for the iOS Simulator:

```
eas build --platform ios --profile simulator
```

### Option 3: You have an Android device

→ Build a development version for your Android device:

```
eas build --platform android --profile development
```

### Option 4: None of the above

→ Build for the Android Emulator:

```
eas build --platform android --profile simulator
```

## About the demo app

The demo is based off the Expo Router tabs starter (`npx create-expo-app --template tabs`), and also includes Nativewind v4 for most of the styling.

## Talk to the presenters

- [Quinlan Jung](https://x.com/quinlanjung)
- [Gabriel Donadel](https://x.com/donadeldev)
