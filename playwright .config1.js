const { devices } = require("@playwright/test");
const { workers } = require("cluster");
const { permission } = require("process");

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = {
  testDir: './tests',
  timeout: 40000,
    actionTimeout: 10 * 1000,
        navigationTimeout: 30 * 1000,
// workers: 3,
  expect: {
    timeout: 7000,
  },

  reporter: 'html',

  projects: [
    {
      name: 'chrome',
      use: {
        channel: 'chrome',
        headless: false,
        permission: true,
        // ...devices['iphone 13'],
        ignoreHttpsErrors: true,
        screenshot: 'on',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
   
      },
    },
    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
        headless: false,
        // viewport: {width: 720,hieght: 720},
      },
    },
  ],
};

module.exports = config;
