# 🗣️ talk-mate

This is an app I built to make chatting with people from other countries a whole lot easier.  

It listens to what you say (speech to text), translates it into their language, and then speaks it back out loud — like a helpful little translator in your pocket.

I built it as a fun way to explore AI, play with speech and translation APIs, and create something genuinely useful for when I'm traveling abroad.

## ✨ Features
- 🎙️ Speech to Text – Transcribes your voice in real-time.
- 🌐 Translation – Converts your words into another language using powerful translation APIs.
- 🔊 Text to Speech – Renders the translated message as speech in the target language.


## 📱 Screenshots

<img src="./assets/video.gif" width="270" />

## 🛠️ Tech Stack
| Layer          | Tech/Service                             |
| -------------- | ---------------------------------------- |
| Framework      | [Expo](https://expo.dev), React Native   |
| Speech-to-Text | [expo-speech-recognition](https://github.com/jamsch/expo-speech-recognition?tab=readme-ov-file#installation) |
| Translation    | OpenAI's [GPT Responses API](https://platform.openai.com/docs/guides/text?api-mode=responses) |
| Text-to-Speech | OpenAI's [Text to speech](https://platform.openai.com/docs/guides/text-to-speech) |

## ⚠️ Disclaimer

This application exposes an OpenAI API key in the frontend, which is **not secure** and **should never be used in production**.  
In a real-world application, all OpenAI API calls should be routed through a secure backend or a trusted proxy to protect your API credentials.

## 🚀 Get started

Install dependencies, and start the app.

```bash
npm install
npx expo start
```

## 🏗️ Build

If you want a development build, so that you can try the app e.g. with hot reload using your device, run:

```bash 
$ eas build --profile development --platform android --local
```

And then activate your expo server:
```bash
$ npx expo start
```

If you want to run a development build on your Android emulator instead, run:
```bash
$ npx expo run:android
```

Otherwise, if you want to have a "standalone" build, run:

```bash
$ eas build --profile preview --platform android --local
```

## 🤝 Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.
