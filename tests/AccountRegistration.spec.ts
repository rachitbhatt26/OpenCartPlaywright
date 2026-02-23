/*
Account Register
steps
1- Navigate to url
2- Click on My Account & then Register
3- Fill in Registration details
4- Agree & then submit
5- Validate Confirmation msg
*/

//  Code with hook & better restructuring-Before & After Hook
import { test, expect } from '@playwright/test'
import { RandomDataUtil } from '../utils/randomDataGenerator'
import { HomePage } from "../pages/HomePage"
import { RegistrationPage } from "../pages/RegistrationPage"
import { TestConfig } from "../test.config"

//Creating Global Variable for Home and Registration page to be accessed from below
let homePage: HomePage;
let registrationPage: RegistrationPage;
let config: TestConfig;

//Before Hook
test.beforeEach(async ({ page }) => {
    config = new TestConfig();
    await page.goto(config.appUrl); //Navigate registration url
    homePage = new HomePage(page); //Home Page
    registrationPage = new RegistrationPage(page); //Registration Page
}
)

//After Hook
test.afterEach(async ({ page }) => {
    page.close;
    await page.waitForTimeout(2000);
}
)

test('User registration @master @regression', async ({ }) => {
    await homePage.clickMyAccount();
    await homePage.clickRegister();

    //Fill in registration detail on form
    {
        await registrationPage.setFirstName(RandomDataUtil.getFirstName());
        await registrationPage.setLastName(RandomDataUtil.getLastName());
        await registrationPage.setEmail(RandomDataUtil.getRandomEmail());
        await registrationPage.setTelephone(RandomDataUtil.getPhoneNumber());

        //Password Enter 
        const password = RandomDataUtil.getPassword();
        await registrationPage.setPassword(password);
        //await page.waitForTimeout(2000) ;
        await registrationPage.setConfirmPassword(password);
        //await page.waitForTimeout(2000) ;

        //  Proceed for submission
        await registrationPage.setPrivacyPolicy();
        await registrationPage.clickContinue();

        //submission Confirmation Message Validation
        const confirmationMessage = await registrationPage.getConfirmationMsg();
        expect(confirmationMessage).toBe('Your Account Has Been Created!'); //Partial match use 'tocontain()' , full match use 'toBe() / toEqual()' 

    }
}
)