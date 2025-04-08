import { test, expect } from '@playwright/test';

test.describe('Settings Page Functionality', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the login page before each test
    await page.goto('/');
    
    // Login with valid credentials
    await page.getByLabel('Email address').fill('soar@soar.com');
    await page.getByPlaceholder('Enter your password').fill('hire-me');
    await page.getByRole('button', { name: 'Sign in' }).click();
    
    // Wait for redirection to dashboard
    await page.waitForURL('**/dashboard');
    
    // Make sure we're on the dashboard before proceeding
    await expect(page.getByRole('heading', { name: 'My Cards' })).toBeVisible({ timeout: 5000 });
  });

  test('should allow user to update profile settings', async ({ page }) => {
    // Navigate to Settings page by URL directly
    await page.goto('/settings');
    
    // Verify we're on the Settings page by checking for the Edit Profile tab
    await expect(page.getByRole('tab', { name: 'Edit Profile' })).toBeVisible({ timeout: 5000 });
    
    // Make sure the "Edit Profile" tab is active
    await expect(page.getByRole('tab', { name: 'Edit Profile', selected: true })).toBeVisible();
    
    // Get the current city value to verify it changes
    const currentCity = await page.locator('#city').inputValue();
    
    // Edit the city field with a new value that includes a timestamp to ensure uniqueness
    const newCityValue = `New City ${Date.now().toString().slice(-4)}`;
    await page.locator('#city').click();
    await page.locator('#city').clear();
    await page.locator('#city').fill(newCityValue);
    
    // Click the Save button
    await page.getByRole('button', { name: 'Save' }).click();
    
    // Verify that the success toast appears
    await expect(page.getByText('Profile updated successfully!')).toBeVisible({ timeout: 5000 });
    
    // Verify that the field was updated by checking if the input value matches what we set
    await expect(page.locator('#city')).toHaveValue(newCityValue);
    
    // Verify the value is different from the original
    expect(await page.locator('#city').inputValue()).not.toBe(currentCity);
    
    // Refresh the page to ensure the changes persist
    await page.reload();
    
    // Wait for the page to load after refresh
    await expect(page.getByRole('tab', { name: 'Edit Profile' })).toBeVisible({ timeout: 5000 });
    
    // Verify the updated value is still there after refresh
    await expect(page.locator('#city')).toHaveValue(newCityValue);
  });
});
