import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/registerPage';
import TestData from '../data/testData.json';

let registerPage: RegisterPage;

test.beforeEach(async({page}) => {
  registerPage = new RegisterPage(page);
  await registerPage.visitRegistrationPage();
});

test('TC-1 Verify visual elements on the registration page', async ({ page }) => {
  await expect(registerPage.firstNameInput).toBeVisible();
  await expect(registerPage.lastNameInput).toBeVisible();
  await expect(registerPage.emailInput).toBeVisible();
  await expect(registerPage.passwordInput).toBeVisible();
  await expect(registerPage.registerButton).toBeVisible();

});

test('TC-2 Verify that the registration button is disabled by default.', async ({ page }) => {
  await expect(registerPage.registerButton).toBeDisabled();

});

test('TC-3 Verify that the registration button is enabled after completing the required fields.', async ({ page }) => {
  await registerPage.completeRegistrationForm(TestData.validUser);
  await expect(registerPage.registerButton).toBeEnabled();
});

test('TC-4 Verify the redirection to the login page when clicking the registration button', async ({ page }) => {
  await registerPage.loginButton.click();
  await expect(page).toHaveURL('http://localhost:3000/login');

});

test('TC-5 Verify successful registration with valid data', async ({ page }) => {
  test.step('Complete the registration form with valid data', async () => {
      const email = (TestData.validUser.email.split('@')[0]) + Date.now().toString() + '@' + TestData.validUser.email.split('@')[1];
      TestData.validUser.email = email;
      await registerPage.completeRegistrationFormClickOnRegistrationButton(TestData.validUser);
  });
  await expect(page.getByText('Registro exitoso')).toBeVisible();
});

test('TC-6 Verify that a user cannot register with an existing email address', async ({ page }) => {
    const email = (TestData.validUser.email.split('@')[0]) + Date.now().toString() + '@' + TestData.validUser.email.split('@')[1];
    TestData.validUser.email = email;
    await registerPage.completeRegistrationFormClickOnRegistrationButton(TestData.validUser);
    await expect(page.getByText('Registro exitoso')).toBeVisible();
    await registerPage.visitRegistrationPage();
    await registerPage.completeRegistrationFormClickOnRegistrationButton(TestData.validUser);
    await expect(page.getByText('Email already in use')).toBeVisible();
    await expect(page.getByText('Registro exitoso')).not.toBeVisible();
});
