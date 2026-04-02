# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started
0. Create Env

```bash
cp example.env .env
```

1. Install dependencies

   ```bash
   npm install
   ```

2. Start dev app

   ```bash
   npx expo start
   ```

## Build for Android

```bash

rm -rf android/app/src/main/res/drawable-*
npx expo prebuild --clean
echo "sdk.dir = C:\\\Users\\\anish\\\AppData\\\Local\\\Android\\\Sdk" >> android\local.properties
npx react-native build-android --mode=release
./gradlew bundleRelease
```