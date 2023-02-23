const config = {
    // Allow 1 automatic retry for issues in the environment
    retries: 1,
    use: {
        // TODO: Eventually want this to be true for when running on the pipeline, set to false for testing
        headless: true,
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true,
        video: 'on-first-retry',
        baseURL: 'http://localhost:5173',
    },
    testDir: 'e2e',
    webServer: {
        command: 'npm run start',
        env: {PORT: 5173},
        port: '5173',
        reuseExistingServer: false,
        // Default timeout of 30 seconds
        timeout: 30 * 1000
    }
};
export default config;