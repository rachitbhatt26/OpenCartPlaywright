/* steps to follow
Navigate to url
Click on MyAccount
Click on Login
Enter Email & pwd
Click Login Button
*/
import { test, expect } from '@playwright/test';
//import { RandomDataUtil } from "../utils/randomdatagenerator";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from '../pages/LoginPage';
import { TestConfig } from "../test.config";

//Creating Global Variable for Home and Login page to be accessed from below
let homePage: HomePage;
let loginPage: LoginPage;
let config: TestConfig;

//Before Hook
test.beforeEach(async ({ page }) => {
    config = new TestConfig();
    await page.goto(config.appUrl); //Navigate registration url
    homePage = new HomePage(page); //Home Page
    loginPage = new LoginPage(page); //Login Page
}
)

//After Hook
test.afterEach(async ({ page }) => {
    page.close;
    await page.waitForTimeout(2000);
}
)

test('User Login @master @sanity @regression', async ({ }) => {
    await homePage.clickMyAccount();
    await homePage.clickLogin();

    //Fill in Login detail on form-uname & pwd
    {
        //Uname enter
        await loginPage.EnterUsername(config.email);

        //Password Enter 
        await loginPage.EnterPassword(config.password);

        //  Proceed for submission
        await loginPage.clickLoginBtn();

        //submission Confirmation Message Validation
        const confirmationMessage = await loginPage.getAccountmsgConfirmation();
        expect(confirmationMessage).toBe('My Account'); //Partial match use 'tocontain()' , full match use 'toBe() / toEqual()' 

    }

}
)