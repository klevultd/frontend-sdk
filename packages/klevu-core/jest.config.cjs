/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        //the content you'd placed at "global"
        useESM: true,
        tsconfig: "tsconfig-tests.json",
      },
    ],
  },
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  globals: {
    window: {},
    document: {
      dispatchEvent: () => "",
    },
    CustomEvent: function (name, params) {
      return params
    },
  },
}
