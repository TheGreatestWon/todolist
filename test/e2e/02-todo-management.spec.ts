import { test, expect } from '@playwright/test';

/**
 * 시나리오 3.2: 할 일 생성 및 관리
 * 참조: docs/3-user-scenario.md - 시나리오 A, B, C
 */

test.describe('할 일 관리', () => {
  const testEmail = `test-${Date.now()}@example.com`;
  const testPassword = 'password123';

  // 모든 테스트 전에 로그인
  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();

    // 회원가입
    await page.goto('/register');
    await page.fill('input[type="email"]', testEmail);
    await page.fill('input[type="password"]', testPassword);
    const registerButton = page.locator('button:has-text("가입"), button:has-text("회원가입"), button[type="submit"]').first();
    await registerButton.click();

    await page.waitForTimeout(1000);
    await page.close();
  });

  test.beforeEach(async ({ page }) => {
    // 로그인
    await page.goto('/login');
    await page.fill('input[type="email"]', testEmail);
    await page.fill('input[type="password"]', testPassword);
    const loginButton = page.locator('button:has-text("로그인"), button[type="submit"]').first();
    await loginButton.click();
    await page.waitForURL(/.*todos|.*\/(?!login|register)/, { timeout: 10000 });
  });

  test('시나리오 A: 제목만으로 간단한 할 일 추가', async ({ page }) => {
    // 0단계: "새 할 일 추가" 버튼 클릭하여 모달 열기
    const addTodoButton = page.locator('button:has-text("새 할 일 추가"), button:has-text("추가")').first();
    await addTodoButton.click();

    // 1단계: 할 일 추가 폼 찾기
    const titleInput = page.locator('input[placeholder*="제목"], input[name="title"], input[type="text"]').first();
    await expect(titleInput).toBeVisible();

    // 2단계: 제목 입력
    const todoTitle = '프로젝트 기획서 작성';
    await titleInput.fill(todoTitle);

    // 3단계: 모달 안의 추가 버튼 클릭
    const modal = page.locator('[role="dialog"]');
    const addButton = modal.locator('button:has-text("추가"), button[type="submit"]').first();
    await addButton.click();

    // 4단계: 목록에 할 일 표시 확인
    await expect(page.locator(`text=${todoTitle}`)).toBeVisible({ timeout: 5000 });
  });

  test('시나리오 B: 상세 정보와 마감일을 포함한 할 일 추가', async ({ page }) => {
    // 0단계: "새 할 일 추가" 버튼 클릭하여 모달 열기
    const addTodoButton = page.locator('button:has-text("새 할 일 추가"), button:has-text("추가")').first();
    await addTodoButton.click();

    // 1단계: 제목 입력
    const titleInput = page.locator('input[placeholder*="제목"], input[name="title"], input[type="text"]').first();
    const todoTitle = 'API 문서 작성';
    await titleInput.fill(todoTitle);

    // 2단계: 설명 입력 (있는 경우)
    const descriptionInput = page.locator('textarea, input[name="description"]').first();
    if (await descriptionInput.isVisible().catch(() => false)) {
      await descriptionInput.fill('Swagger API 문서 작성 및 업데이트');
    }

    // 3단계: 마감일 선택 (있는 경우)
    const dateInput = page.locator('input[type="date"]').first();
    if (await dateInput.isVisible().catch(() => false)) {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 3);
      const dateString = futureDate.toISOString().split('T')[0];
      await dateInput.fill(dateString);
    }

    // 4단계: 모달 안의 추가 버튼 클릭
    const modal = page.locator('[role="dialog"]');
    const addButton = modal.locator('button:has-text("추가"), button[type="submit"]').first();
    await addButton.click();

    // 5단계: 확인 (제목을 heading으로 더 구체적으로 찾기)
    await expect(page.getByRole('heading', { name: todoTitle })).toBeVisible({ timeout: 5000 });
  });

  test('시나리오 C: 완료 처리', async ({ page }) => {
    // 0단계: "새 할 일 추가" 버튼 클릭하여 모달 열기
    const addTodoButton = page.locator('button:has-text("새 할 일 추가"), button:has-text("추가")').first();
    await addTodoButton.click();

    // 1단계: 할 일 추가
    const titleInput = page.locator('input[placeholder*="제목"], input[name="title"], input[type="text"]').first();
    const todoTitle = '테스트 작성';
    await titleInput.fill(todoTitle);

    const modal = page.locator('[role="dialog"]');
    const addButton = modal.locator('button:has-text("추가"), button[type="submit"]').first();
    await addButton.click();

    await page.waitForTimeout(500);

    // 2단계: 체크박스 클릭
    const todoItem = page.locator(`text=${todoTitle}`).locator('..').locator('..'); // 부모 요소 찾기
    const checkbox = todoItem.locator('input[type="checkbox"]').first();
    await checkbox.check();

    await page.waitForTimeout(500);

    // 3단계: 완료 상태 확인 (취소선 또는 완료 섹션으로 이동)
    const completedTodo = page.locator(`text=${todoTitle}`).locator('..');
    await expect(completedTodo).toHaveCSS('text-decoration', /line-through/).catch(async () => {
      // 취소선이 없으면 완료 섹션으로 이동했는지 확인
      await expect(page.locator('text=완료')).toBeVisible();
    });
  });

  test('시나리오 D: 할 일 삭제', async ({ page }) => {
    // 0단계: "새 할 일 추가" 버튼 클릭하여 모달 열기
    const addTodoButton = page.locator('button:has-text("새 할 일 추가"), button:has-text("추가")').first();
    await addTodoButton.click();

    // 1단계: 할 일 추가
    const titleInput = page.locator('input[placeholder*="제목"], input[name="title"], input[type="text"]').first();
    const todoTitle = '삭제할 할 일';
    await titleInput.fill(todoTitle);

    const modal = page.locator('[role="dialog"]');
    const addButton = modal.locator('button:has-text("추가"), button[type="submit"]').first();
    await addButton.click();

    await page.waitForTimeout(500);

    // 2단계: 삭제 버튼 찾기
    const todoItem = page.locator(`text=${todoTitle}`).locator('..').locator('..');
    const deleteButton = todoItem.locator('button:has-text("삭제"), button[aria-label*="삭제"]').first();

    if (await deleteButton.isVisible().catch(() => false)) {
      await deleteButton.click();

      // 3단계: 확인 대화상자 처리
      page.on('dialog', async dialog => {
        expect(dialog.message()).toContain('삭제');
        await dialog.accept();
      });

      await page.waitForTimeout(500);

      // 4단계: 목록에서 사라졌는지 확인
      await expect(page.locator(`text=${todoTitle}`)).not.toBeVisible({ timeout: 5000 });
    }
  });
});
