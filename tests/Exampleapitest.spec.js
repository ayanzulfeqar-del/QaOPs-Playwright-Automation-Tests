import { test, expect } from '@playwright/test';

test('Log in — get a token', async ({ request }) => {
  const res = await request.post('https://www.qapractice.com/api/auth/login', {
    data: { "username": "testuser", "password": "Password123" },
  });
  expect(res.status()).toBe(200);
  const body = await res.json();
  console.log(body);
});