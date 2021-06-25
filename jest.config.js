module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  coverageThreshold: {
    global: {
      statements: 60,
      functions: 50,
      lines: 50,
    },
  },
};
