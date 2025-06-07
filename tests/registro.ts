import { test, expect } from '@playwright/test';

test('TC-1 Verificacion de elementos visuales en la pagina de registro', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page.locator('input[name=firstName]')).toBeVisible();
  await expect(page.locator('input[name=lastName]')).toBeVisible();
  await expect(page.locator('input[name=email]')).toBeVisible();
  await expect(page.locator('input[name=password]')).toBeVisible();
  await expect(page.getByTestId('boton-registrarse')).toBeVisible();
  //await page.waitForTimeout(5000);

});

test('TC-2 Verificar que el boton de registro esta deshabilitado por defecto', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page.getByTestId('boton-registrarse')).toBeDisabled();

});

test('TC-3 Verificar que el boton de registro se habilite luego de diligenciar los campos obligatorios', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.locator('input[name=firstName]').fill('Juliana');
  await page.locator('input[name=lastName]').fill('Velasquez');
  await page.locator('input[name=email]').fill('julia@velasquez.com');
  await page.locator('input[name=password]').fill('password123');
  await expect(page.getByTestId('boton-registrarse')).toBeEnabled();

});

test('TC-4 Verificar redireccionamiento a pagina de inicio de sesion al hacer clic en el botón de registro', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByTestId('boton-login-header-signup').click();
  await expect(page).toHaveURL('http://localhost:3000/login');

});

test('TC-5 Verificar registro exitoso con datos validos', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.locator('input[name=firstName]').fill('Juliana');
  await page.locator('input[name=lastName]').fill('Velasquez');
  await page.locator('input[name=email]').fill('juliana'+Date.now().toString()+'@gmail.com');
  await page.locator('input[name=password]').fill('password123');
  await page.getByTestId('boton-registrarse').click();
  await expect(page.getByText('Registro exitoso')).toBeVisible();
});

test('TC-6 Verificar que un usuario no pueda registarse con un correo electronico ya existente', async ({ page }) => {
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
