/*
Account Register
steps
1- Navigate to url
2- Click on My Account & then Register
3- Fill in Registration details
4- Agree & then submit
5- Validate Confirmation msg
*/
//Basic code without hook and retructuring

import {test,expect} from '@playwright/test'
import { RandomDataUtil} from "../utils/randomdatagenerator";
import {HomePage} from "../pages/HomePage"
import {RegistrationPage} from "../pages/RegistrationPage"
import {TestConfig} from "../test.config"

test('User registration', async({page})=>
{
const config=new TestConfig();
await page.goto(config.appUrl); //Navigate registration url


const homePage=new HomePage(page);
await homePage.clickMyAccount ();
await homePage.clickRegister() ;

//Fill in registration detail on form

const registrationPage=new RegistrationPage (page);
{
registrationPage.setFirstName(RandomDataUtil.getFirstName());
await page.waitForTimeout(1000) ;
registrationPage.setLastName(RandomDataUtil.getLastName() );
await page.waitForTimeout(1000) ;
registrationPage.setEmail(RandomDataUtil.getRandomEmail() );
await page.waitForTimeout(1000) ;
registrationPage.setTelephone(RandomDataUtil.getPhoneNumber()) ;
await page.waitForTimeout(1000) ;

//Password Enter 
const password=RandomDataUtil.getPassword();
await registrationPage.setPassword(password);
//await page.waitForTimeout(2000) ;
await registrationPage.setConfirmPassword(password);
//await page.waitForTimeout(2000) ;

//  Proceed for submission
await registrationPage.setPrivacyPolicy() ;
await registrationPage.clickContinue() ;

//submission Confirmation Message Validation
const confirmationMessage=await registrationPage.getConfirmationMsg() ;
expect(confirmationMessage).toBe('Your Account Has Been Created!'); //Partial match use 'tocontain()' , full match use 'toBe() / toEqual()' 

await page.waitForTimeout(2000) ;

}
}
)