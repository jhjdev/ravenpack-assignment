# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Table of Contents

- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)
- [Available Scripts](#available-scripts)
- [Running the App](#running-the-app)
- [Testing](#testing)
- [Linting](#linting)
- [Debugging](#debugging)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

1. Clone the repository:

   ```sh
   git clone https://github.com/jhjdev/ravenpack-assignment.git
   cd your-repo-name

   ```

1. Install dependencies

   ```bash
   pnpm install
   ```

1. Start the app

   ```bash
    pnpx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Folder Structure

```
├── app
│ ├── components
│ │ ├── Card.tsx
│ │ └── ThemedText.tsx
│ ├── screens
│ │ ├── AboutScreen.tsx
│ │ └── SettingsScreen.tsx
│ └── tabs
│ └── settings.tsx
├── src
│ ├── contexts
│ │ └── ThemeContext.tsx
│ ├── styles
│ │ ├── styles.ts
│ │ └── [theme.ts](http://_vscodecontentref_/1)
│ └── utils
│ └── helpers.ts
├── [.eslintrc.js](http://_vscodecontentref_/2)
├── .prettierrc
├── App.tsx
├── [package.json](http://_vscodecontentref_/3)
└── [README.md](http://_vscodecontentref_/4)
```

## Available Scripts

In the project directory, you can run:

```bash
pnpm start
```

Runs the app in development mode. Open http://localhost:19002 to view it in the browser.

```bash
pnpm run android
```

Builds the app for Android and starts it on an emulator or connected device.

```bash
pnpm run ios
```

Builds the app for iOS and starts it on an emulator or connected device.

```bash
pnpm run web
```

Runs the app in the web browser.

```bash
pnpm test
```

Launches the test runner in interactive watch mode.

```bash
pnpm run lint
```

Runs ESLint to analyze the code for potential errors and code style issues.

```bash
pnpm run lint:fix
```

Runs ESLint and automatically fixes any fixable issues.

## Running the App

To run the app on your device or emulator, use the following commands:

For Android:

```bash
pnpm run android
```

For iOS:

```bash
pnpm run ios
```

For Web:

```bash
pnpm run web
```

## Testing
To run tests, use the following command:

```bash
pnpm test
```

This will run all the tests in the project using Jest.

## Linting

Linting
To lint the code, use the following command:

```bash
pnpm run lint
```

To automatically fix linting issues, use:

```bash
pnpm run lint:fix
```

## Debugging
To debug the app, you can use the built-in debugging tools provided by Expo. You can also use React Native Debugger or other debugging tools compatible with React Native.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

Fork the repository.
Create a new branch (git checkout -b feature-branch).
Make your changes.
Commit your changes (git commit -m 'Add some feature').
Push to the branch (git push origin feature-branch).
Open a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

```bash
This README file provides a thorough overview of the project, including instructions for getting started, the folder structure, available scripts, and commands for running, testing, linting, and debugging the project.
```
