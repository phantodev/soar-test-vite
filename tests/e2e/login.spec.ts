import { test, expect } from '@playwright/test';

test.describe('Authentication System', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the login page before each test
    await page.goto('/');
  });

  test('should show error when attempting login with invalid credentials', async ({ page }) => {
    // Fill the form with invalid credentials
    await page.getByLabel('Email address').fill('invalid@user.com');
    // Usando um seletor mais específico para o campo de senha
    await page.getByPlaceholder('Enter your password').fill('wrong-password');
    
    // Click the login button
    await page.getByRole('button', { name: 'Sign in' }).click();
    
    // Verify that the error toast appears
    await expect(page.getByText('Invalid credentials')).toBeVisible();
    
    // Verify that the specific error message appears
    await expect(page.getByText('Email or password is invalid')).toBeVisible();
    
    // Verify that we were not redirected to the dashboard
    expect(page.url()).not.toContain('/dashboard');
  });

  test('should login successfully using valid credentials', async ({ page }) => {
    // Fill the form with valid credentials (as per the memory)
    await page.getByLabel('Email address').fill('soar@soar.com');
    // Usando um seletor mais específico para o campo de senha
    await page.getByPlaceholder('Enter your password').fill('hire-me');
    
    // Check the "Remember me" option
    // Using a more precise selector since the Switch is not directly inside a label element
    await page.locator('#remember-me').check();
    
    // Click the login button
    await page.getByRole('button', { name: 'Sign in' }).click();
    
    // Verify that the success toast appears
    await expect(page.getByText('Login successful!')).toBeVisible();
    
    // Verify that we were redirected to the dashboard
    await page.waitForURL('**/dashboard');
    expect(page.url()).toContain('/dashboard');
    
    // Verify that dashboard elements are visible
    // This confirms that the login was successful and the redirection worked
    // Checking for specific dashboard elements instead of a generic heading
    await expect(page.getByRole('heading', { name: 'My Cards' })).toBeVisible({ timeout: 5000 });
    await expect(page.getByRole('heading', { name: 'Recent Transaction' })).toBeVisible({ timeout: 5000 });
  });

  test('should logout successfully', async ({ page }) => {
    // First login with valid credentials
    await page.getByLabel('Email address').fill('soar@soar.com');
    // Usando um seletor mais específico para o campo de senha
    await page.getByPlaceholder('Enter your password').fill('hire-me');
    // We don't need to check Remember me for the logout test
    await page.getByRole('button', { name: 'Sign in' }).click();
    
    // Wait for redirection to dashboard
    await page.waitForURL('**/dashboard');
    
    // Find and click the logout button
    // Based on the actual implementation in the Sidebar component
    await page.getByRole('button', { name: 'Logout' }).click();
    
    // Verify that the success toast appears
    await expect(page.getByText('Logout successful!')).toBeVisible();
    
    // Verify that we were redirected back to the login page
    await page.waitForURL('**/');
    
    // Verify that login form is visible again
    await expect(page.getByLabel('Email address')).toBeVisible();
    await expect(page.getByPlaceholder('Enter your password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible();
  });
});
