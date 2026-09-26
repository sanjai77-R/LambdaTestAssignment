const {test, page, expect} = require('@playwright/test')

test('Login page',async ({page})=>{
    await page.goto("https://demoqa.com/automation-practice-form");
    await page.locator('#firstName').fill("sanjai");
    await page.locator('#lastName').fill("R");
    await page.locator('input[placeholder="name@example.com"]').fill("sanjai@gamil.com");
    await page.locator('#gender-radio-1').click();
    await page.locator('#userNumber').fill("9898989997");
    await page.locator("#submit").click();
    await expect(page.locator('#example-modal-sizes-title-lg')).toBeHidden();
})