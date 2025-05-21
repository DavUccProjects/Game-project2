export default {
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "jsx", "json"],
  transform: {
    "^.+\\.(js|jsx)$": ["@swc/jest", {
      jsc: {
        parser: {
          syntax: "ecmascript",
          jsx: true
        },
        transform: {
          react: {
            runtime: "automatic"
          }
        }
      }
    }]
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },
  setupFilesAfterEnv: [
    "<rootDir>/setupTests.js"
  ],
  testMatch: [
    "**/__tests__/**/*.test.js",
    "**/?(*.)+(test).js"
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,jsx}",
    "!src/**/*.test.{js,jsx}",
    "!src/**/index.{js,jsx}",
    "!**/node_modules/**"
  ]
};