import { expect, test } from '@playwright/test'
import {
    navigateToHomePage,

} from './helper/e2e-helper'

test('Homepage should have correct title', async ({ page }) => {
    await navigateToHomePage(page)
    await expect(page).toHaveTitle(/Store Genius/)
})

test('Feedback form should display error messages if invalid input', async ({ page }) => {

    await navigateToHomePage(page)
    await page.fill('input[name=email]', 'invalid@email');

    await page.click('text=SEND!')
    await expect(page.locator('#\\:r1\\:-helper-text')).toHaveText('Email is invalid');
    await expect(page.locator('#\\:r3\\:-helper-text')).toHaveText('Give us more feedback!');

    await page.waitForTimeout(1000);
})
