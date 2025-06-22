# talk-mate

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

Install dependencies, and start the app.

```bash
npm install
npx expo start
```

## Build

If you want a development build, so that you can try the app eg with the hot reload using your decive, run:

```bash 
$ eas build --profile development --platform android --local
```

And then activate your expo server
```bash
$ npx expo start
```

If you want to run a development build on your Android emulator instead, run:
```bash
$ npx expo run:android
```

Otherwise, if you want to have a "standalone" build, run 

```bash
$ eas build --profile preview --platform android --local
```

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.
