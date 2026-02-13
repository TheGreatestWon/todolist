import { test, expect } from '@playwright/test';

/**
 * 시나리오 3.1: 사용자 등록 및 인증
 * 참조: docs/3-user-scenario.md - 시나리오 A, B
 */

test.describe('사용자 등록', () => {
  const testEmail = `test-${Date.now()}@example.com`;
  const testPassword = 'password123';

  test('시나리오 A: 첫 방문 사용자의 회원가입', async ({ page }) => {
    // 1단계: 서비스 발견 - 회원가입 페이지 접속
    await page.goto('/register');

    // 2단계: 회원가입 폼 확인
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();

    // 3단계: 이메일과 비밀번호 입력
    await page.fill('input[type="email"]', testEmail);
    await page.fill('input[type="password"]', testPassword);

    // 4단계: 가입 버튼 클릭
    const registerButton = page.locator('button:has-text("가입"), button:has-text("회원가입"), button[type="submit"]').first();
    await registerButton.click();

    // 5단계: 가입 성공 후 로그인 페이지로 리다이렉트
    await expect(page).toHaveURL(/.*login/, { timeout: 10000 });

    // 6단계: 성공 메시지 확인 (있는 경우)
    // await expect(page.locator('text=가입 성공')).toBeVisible({ timeout: 5000 }).catch(() => {});
  });

  test('시나리오 B: 중복 이메일로 가입 시도', async ({ page }) => {
    // 1단계: 회원가입 페이지 접속
    await page.goto('/register');

    // 2단계: 이미 등록된 이메일 입력
    await page.fill('input[type="email"]', testEmail);
    await page.fill('input[type="password"]', testPassword);

    // 3단계: 가입 시도
    const registerButton = page.locator('button:has-text("가입"), button:has-text("회원가입"), button[type="submit"]').first();
    await registerButton.click();

    // 4단계: 오류 메시지 확인
    await expect(
      page.locator('text=/이미 사용|중복|exists/i')
    ).toBeVisible({ timeout: 5000 });
  });

  test('로그인 성공', async ({ page }) => {
    // 1단계: 로그인 페이지 접속
    await page.goto('/login');

    // 2단계: 자격증명 입력
    await page.fill('input[type="email"]', testEmail);
    await page.fill('input[type="password"]', testPassword);

    // 3단계: 로그인 버튼 클릭
    const loginButton = page.locator('button:has-text("로그인"), button[type="submit"]').first();
    await loginButton.click();

    // 4단계: 할 일 목록 페이지로 이동 확인
    await expect(page).toHaveURL(/.*todos|.*\/(?!login|register)/, { timeout: 10000 });

    // 5단계: 로그아웃 버튼 확인 (인증 성공 검증)
    await expect(
      page.locator('button:has-text("로그아웃"), a:has-text("로그아웃")')
    ).toBeVisible({ timeout: 5000 });
  });
});
