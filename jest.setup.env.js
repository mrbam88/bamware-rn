// jest.setup.env.js
process.env.EXPO_OS = "android"
global.__TEST__ = true

// Force React Native to use the "web" implementation in tests
process.env.REACT_NATIVE_APP_ROOT = "."
