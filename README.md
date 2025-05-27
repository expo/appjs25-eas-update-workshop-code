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

## Getting started

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

4. Log in to your Expo account with

```
eas login
```

5. Complete module [00-getting-started.md](https://github.com/expo/appjs25-eas-update-workshop-lessons/blob/main/00-getting-started.md) in the companion repo. You should have a development build of the app running on your device.

## About the demo app

The app is a concept for a guide for an art museum, where you can virtually tour the available exhibits and "favorite" the exhibits you would like to see in person.

The works of art themselves are pulled from the [Cleveland Museum of Art Open Access API](https://openaccess-api.clevelandart.org/), retrieved using TanStack query. You could use the API directly, but for reliability's sake, it's pulling the data from local files, though the images themselves are still pulled from the museum's CDN.

The demo is based off the Expo Router tabs starter (`npx create-expo-app --template tabs`), and also includes Nativewind v4 for most of the styling.

## Talk to the presenters

- [Quinlan Jung](https://x.com/quinlanjung)
- [Gabriel Donadel](https://x.com/donadeldev)
