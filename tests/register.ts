import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/registerPage';

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
  await registerPage.visitRegistrationPage();
  await expect(registerPage.registerButton).toBeDisabled();

});

test('TC-3 Verify that the registration button is enabled after completing the required fields.', async ({ page }) => {
 const registerPage = new RegisterPage(page);
  await registerPage.visitRegistrationPage();
  await registerPage.completeRegistrationForm('Juliana','Velasquez','julia@velasquez.com','password123');
  await registerPage.clickOnRegistrationButton();

});

test('TC-4 Verify the redirection to the login page when clicking the registration button', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByTestId('boton-login-header-signup').click();
  await expect(page).toHaveURL('http://localhost:3000/login');

});

test('TC-5 Verify successful registration with valid data', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.locator('input[name=firstName]').fill('Juliana');
  await page.locator('input[name=lastName]').fill('Velasquez');
  await page.locator('input[name=email]').fill('juliana'+Date.now().toString()+'@gmail.com');
  await page.locator('input[name=password]').fill('password123');
  await page.getByTestId('boton-registrarse').click();
  await expect(page.getByText('Registro exitoso')).toBeVisible();
});

test('TC-6 Verify that a user cannot register with an existing email address', async ({ page }) => {
  const email = 'juliana'+Date.now().toString()+'@gmail.com';
  await page.goto('http://localhost:3000/');
  await page.locator('input[name=firstName]').fill('Juliana');
  await page.locator('input[name=lastName]').fill('Velasquez');
  await page.locator('input[name=email]').fill(email);
  await page.locator('input[name=password]').fill('password123');
  await page.getByTestId('boton-registrarse').click();
  await expect(page.getByText('Registro exitoso')).toBeVisible();

   await page.goto('http://localhost:3000/');
  await page.locator('input[name=firstName]').fill('Juliana');
  await page.locator('input[name=lastName]').fill('Velasquez');
  await page.locator('input[name=email]').fill(email);
  await page.locator('input[name=password]').fill('password123');
  await page.getByTestId('boton-registrarse').click();
  await expect(page.getByText('Email already in use')).toBeVisible();
  await expect(page.getByText('Registro exitoso')).not.toBeVisible();
});
