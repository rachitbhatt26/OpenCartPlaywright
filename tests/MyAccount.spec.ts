/* steps to follow
Navigate to url
Click on MyAccount
Click on Login
Enter Email & pwd
Click Login Button
Validate Order History
Validate Transactions
Logout
*/

import { test, expect } from '@playwright/test';
import { RandomDataUtil } from "../utils/randomdatagenerator";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from '../pages/LoginPage';
import { TestConfig } from "../test.config";
import { RegistrationPage } from '../pages/RegistrationPage';
import { MyAccountPage } from '../pages/MyAccountPage';

//Creating Global Variable for Home and Login page to be accessed from below
let homePage: HomePage;
let myAccountPage: MyAccountPage;
let config: TestConfig;

//Before Hook
test.beforeEach(async ({ page }) => {
    config = new TestConfig();
    await page.goto(config.appUrl); //Navigate registration url
    
    homePage = new HomePage(page); //Home Page
    myAccountPage= new MyAccountPage(page); //Login Page
}
)

//After Hook
test.afterEach(async ({ page }) => 
    {
    page.close;
    await page.waitForTimeout(2000);
    }
)

test('MyAccountPage @master @sanity @regression', async ({ }) => 
    {
    await homePage.clickMyAccount();
    //Order History
    await myAccountPage.ClickOrderHist() ;
    const confirmationMessage1 = await myAccountPage.ValOrderHistMsgConfirmation();
    expect(confirmationMessage1).toBe('Order History');

    //Transactions Tab
    await myAccountPage.ClickTransactions() ;
    const confirmationMessage2 = await myAccountPage.ClickTransactions ();
    expect(confirmationMessage2).toBe('Your Transactions')
   

}
)
