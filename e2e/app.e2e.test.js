import { expect, test } from '@playwright/test'
import {
    navigateToHomePage,

} from './helper/e2e-helper'

test('Homepage should have correct title', async ({ page }) => {
    await navigateToHomePage(page)
    await expect(page).toHaveTitle(/Store Genius/)
})