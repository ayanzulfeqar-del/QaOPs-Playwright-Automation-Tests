

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = {
  testDir: './tests',
  testMatch: '**/*.spec.js',
  timeout: 40000,
  actionTimeout: 10 * 1000,
  navigationTimeout: 30 * 1000,
  viewport: { width: 1920, height: 1080 },
  // workers: 3,
  // retries: 1,
  expect: {
    timeout: 7000,
  },

  reporter: 'html',
  ignoreHTTPSErrors: true,
  use: {
    headless: true,
    screenshot: 'on',
    trace: 'retain-on-failure',
  },
};

module.exports = config;
