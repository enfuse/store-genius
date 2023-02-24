import { expect, test } from '@playwright/test'
import {
    navigateToHomePage,

} from './helper/e2e-helper'

test('Homepage should have correct title', async ({ page }) => {
    await navigateToHomePage(page)
    await expect(page).toHaveTitle(/Store Genius/)
})

test('Feedback form should not submit if invalid email', async ({ page }) => {

    await navigateToHomePage(page)
    await page.fill('input[name=email]', 'some@account');
    await page.fill('textarea[name=message]', 'this is a test message');

    //const button = await page.$('#\\:r3\\:');
    // Click the button
    //await button.click();

    await page.click('text=Send!')
    await expect(page.$('#\\:r1\\:-helper-text')).toHaveText('Email is invalid');

    await page.waitForTimeout(1000);
})