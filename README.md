# GoMate (Expo React Native Prototype)

A minimal React Native (Expo) prototype for the GoMate Travel & Transport app (selected from index 224233).

This scaffold contains three simple screens: Home, Map (placeholder), and Explore. It's designed as a starting point so you can extend it with maps, routing, and backend services.

Getting started

1. Install dependencies (requires Node.js and npm):

```powershell
cd "e:/MY PROJECTS/Travel & Transport/GoMate"
npm install
```

2. Start Expo:

```powershell
npx expo start
```

3. Open on a device or simulator using the Expo Dev Tools.

Notes
- This scaffold uses plain React Native components and a simple state-based navigation to keep setup lightweight.
- To add maps, install `react-native-maps` or a Mapbox SDK and follow their setup guides (may require native configuration).

Next steps
- Integrate a maps SDK and show nearby stops (GTFS or public transit API).
- Add route search using GTFS/GTFS-realtime or a transit API.
- Add persistence and user favorites (Firebase/Firestore or local storage).
