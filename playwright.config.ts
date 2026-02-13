import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright 설정
 * 사용자 시나리오 기반 E2E 테스트
 */
export default defineConfig({
  testDir: './test/e2e',
  fullyParallel: false, // 순차 실행 (데이터베이스 상태 의존성)
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1, // 단일 워커로 실행
  reporter: [
    ['html', { outputFolder: 'test/e2e/report' }],
    ['json', { outputFile: 'test/e2e/results.json' }],
    ['list']
  ],

  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  webServer: {
    command: 'echo "서버가 이미 실행 중입니다"',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
    timeout: 5000,
  },
});
