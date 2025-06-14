import {Page, Locator} from '@playwright/test';

export class LoginPage{
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.emailInput = page.locator('input[name=email]');
        this.passwordInput = page.locator('input[name=password]');
        this.loginButton = page.getByTestId('boton-login');
    }

    async visitLoginPage(){
        await this.page.goto('http://localhost:3000/login');
        await this.page.waitForLoadState('networkidle');
    }

    async completeLoginForm(user: {email: string, password: string}){
        await this.emailInput.fill(user.email);
        await this.passwordInput.fill(user.password);
    }

    async clickOnLoginButton(){
        await this.loginButton.click();
    }

    async completeLoginFormClickOnLoginButton(user: {email: string, password: string}){
        await this.completeLoginForm(user);
        await this.clickOnLoginButton();
    }

}