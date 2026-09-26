const { test, page, expect } = require('@playwright/test')
test('Demo form page', async ({ page }) => {
    await page.goto("https://www.testmuai.com/selenium-playground/")
    await page.locator('a:text("Simple Form Demo")').click()
    const currentURL = page.url()
    console.log(currentURL)
    //await expect(currentURL).toContain("simple-form-demo")
    const inputString = "Welcome to TestMu AI"
    await page.locator('input#user-message').fill(inputString)
    await expect(page.locator('input#user-message')).toHaveValue(inputString)
    await page.waitForTimeout(1000);
    await page.locator('#showInput').click();
    const displayMessage = await page.locator('p#message').textContent();
    await expect(displayMessage).toBe(inputString);
})

test('Drag and drop', async ({ page }) => {
    await page.goto("https://www.testmuai.com/selenium-playground/")
    await page.locator('a:text("Drag & Drop Sliders")').click()
    const slider = await page.locator('input[value="15"]')
    const boundingBox = await slider.boundingBox();
    await slider.scrollIntoViewIfNeeded();
    const startX = boundingBox.x + boundingBox.width * 0.16;
    const startY = boundingBox.y + boundingBox.height / 2;
    const endX = boundingBox.x + boundingBox.width * 0.93;
    await page.waitForTimeout(1000);
    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(endX, startY);
    await page.mouse.up();
    await page.locator('#rangeSuccess').evaluate(el => el.textContent); 
    await expect(page.locator('#rangeSuccess')).toHaveText("95")

})

test('Input Form Submit', async ({ page }) => {
    await page.goto("https://www.testmuai.com/selenium-playground/")
    await page.locator('a:text("Input Form Submit")').click()
    const submitButton = page.locator('button:text("Submit")')
    const name = page.locator('#name')
    await submitButton.click()
    const validationMessage = await name.evaluate((element)=>element.validationMessage)
    expect(validationMessage).toBe("Please fill out this field.")
    await name.fill("Sanjai")
    await page.locator('#inputEmail4').fill("Sanjai@gamail.com")
    const dropDown = await page.locator('select[name="country"]')
    dropDown.selectOption({ label: 'India' })
    await page.locator('#company').fill("Deloitte")
    await page.locator('#websitename').fill("deloitte.com")
    await page.locator('#inputCity').fill("Chennai")
    await page.locator('#inputAddress1').fill("abc street")
    await page.locator('#inputAddress2').fill("Chepauk")
    await page.locator('#inputState').fill("Tamil Nadu")
    await page.locator('#inputZip').fill("600005")
    await page.locator('#inputPassword4').fill("123456")
    await submitButton.click()
    await page.waitForTimeout(3000)
    // const validationText = await page.locator('p.success-msg').textContent()
    // await expect(validationText).toBe("Thanks for contacting us, we will get back to you shortly.")
    await expect(page.locator('.success-msg')).toHaveText("Thanks for contacting us, we will get back to you shortly.")
})