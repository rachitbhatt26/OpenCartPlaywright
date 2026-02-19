/* steps to follow
Go To Logged IN acccount
Click on My Account
Click on Logout
Validate Log Out Header
*/

import { test, expect } from '@playwright/test';
//import { RandomDataUtil } from "../utils/randomdatagenerator";
import { HomePage } from "../pages/HomePage";
import { TestConfig } from "../test.config";
import { LogOutPage } from '../pages/LogoutPage';
import { LoginPage } from '../pages/LoginPage';
import { MyAccountPage } from '../pages/MyAccountPage';

//Creating Global Variable for Home and Login page to be accessed from below
let homePage: HomePage;
let config: TestConfig;
let logoutPage: LogOutPage;
let loginPage: LoginPage;
let myAccountPage: MyAccountPage;

//Before Hook
test.beforeEach(async ({ page }) => {
    config = new TestConfig();
    await page.goto(config.appUrl); //Navigate registration url
    homePage = new HomePage(page); //Home Page
    logoutPage = new LogOutPage(page);
    loginPage = new LoginPage(page);
    myAccountPage = new MyAccountPage(page);

}
)

//After Hook
test.afterEach(async ({ page }) => {
    page.close;
    await page.waitForTimeout(2000);
}
)

test('LogOutPage @master @sanity @regression', async ({ }) => {
    await homePage.clickMyAccount();
    await homePage.clickLogin();
 //Uname enter
         await loginPage.EnterUsername(config.email);
         //Password Enter 
         await loginPage.EnterPassword(config.password);
         //  Proceed for submission
         await loginPage.clickLoginBtn();
         //submission Confirmation Message Validation
         const confirmationMessage = await loginPage.getAccountmsgConfirmation();
         expect(confirmationMessage).toBe('My Account'); //Partial match use 'tocontain()' , full match use 'toBe() / toEqual()
//Click on Log out
    await logoutPage.LogoutMyAcc();
    //Logout Confirmation Message Validation
    {
        const confirmationMessage = await logoutPage.ValLogoutConfirmMsg();
        expect(confirmationMessage).toBe('Account Logout'); //Partial match use 'tocontain()' , full match use 'toBe() / toEqual()' 

    }
    //Click Continue to confirm Logout
    await logoutPage.ClickContinueToConfirmLogout();
    expect (await homePage.isHomePageExists()).toBe(true);
    console.log("Logout Successfull, Home Page is displayed");

}
)