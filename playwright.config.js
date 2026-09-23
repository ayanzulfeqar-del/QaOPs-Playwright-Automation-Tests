const { devices } = require("@playwright/test");
const { workers } = require("cluster");
const { channel } = require("diagnostics_channel");
const { permission } = require("process");

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = {
  testDir: './tests',
  testMatch: '**/*.spec.js',
  timeout: 40000,
    actionTimeout: 10 * 1000,
        navigationTimeout: 30 * 1000,
// workers: 3,
// retries: 1,
  expect: {
    timeout: 7000,
  },

  reporter: 'html',
 permission: true,
 ignoreHttpsErrors: true,

      // name: 'chrome',
    use:{
        channel: 'chrome',
        headless: false,
        // ...devices['iphone 13'],
        screenshot: 'on',
        // video: 'retain-on-failure',
        trace: 'retain-on-failure',
   
    },

};

module.exports = config;
