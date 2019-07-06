module.exports = function(config) {
  config.set({
    frameworks: ["karma-typescript", 'mocha', 'chai'],
    files: [
      { pattern: "src/**/!(test)*.ts", include: true }
    ],
    preprocessors: {
      "**/*.ts": "karma-typescript"
    },
    plugins: [
      "karma-typescript",
      "karma-chrome-launcher",
      "karma-mocha",
      "karma-chai"
    ],
    reporters: ["progress", "karma-typescript"],
    karmaTypescriptConfig: {
      compilerOptions: {
        target: "es5"
      },
      exclude: [
        "node_modules",
        "*.test.ts"
      ],
      coverageOptions: {
        exclude: [ /test\.ts$/]
      }
    },
    browsers: ["ChromeHeadless"],
    singleRun: true
  });
};
