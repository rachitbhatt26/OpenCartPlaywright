import { Page, Locator, expect } from '@playwright/test';
export class LoginPage {
    private readonly page: Page;

    // Locators 
    //private readonly LinkLogin: Locator;
    private readonly Username: Locator;
    private readonly Password: Locator;
    private readonly LoginBtn: Locator;
    private readonly AccountmsgConfirmation: Locator;


    //constructor

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with css selectors
        // this.LinkLogin = page.locator('li[class="dropdown open"] li:nth-child(2) a:nth-child(1)');
        this.Username = page.locator('//input[@id="input-email"]');
        this.Password = page.locator('//input[@id="input-password"]');
        this.LoginBtn = page.locator('//input[@value="Login"]');
        this.AccountmsgConfirmation = page.locator('//h2[normalize-space()="My Account"]')

    }

    // action method

    // Enter Uname 
    async EnterUsername(Uname: string) {
        try {
            await this.Username.fill(Uname);
        }
        catch (error) {
            console.log(`Exception occurred while entering Username: ${error}`);
            throw error;
        }
    }

    //Enter Pwrd
    async EnterPassword(pwd: string) {
        try {
            await this.Password.fill(pwd);
        }
        catch (error) {
            console.log(`Exception occurred while entering Password: ${error}`);
            throw error;
        }
    }

    // Click Login Button
    async clickLoginBtn() {
        try {
            await this.LoginBtn.click();
        }
        catch (error) {
            console.log(`Exception occurred while clicking 'My Account': ${error}`);
            throw error;
        }
    }

    //Get Account Header Confirmation message Confirmation

    async getAccountmsgConfirmation(): Promise<string> {
        return await this.AccountmsgConfirmation.textContent() ?? '';
    }

    //Complete Login workflow

    async completeLogin(userData: {
        Username: string;
        Password: string;
    }): Promise<void> {
        await this.EnterUsername(userData.Username);
        await this.EnterPassword(userData.Password);
        await this.clickLoginBtn();
        await expect(this.AccountmsgConfirmation).toBeVisible();
    }

}

