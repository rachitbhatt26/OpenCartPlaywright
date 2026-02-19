import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { DataProvider } from '../utils/dataProvider';
import { TestConfig } from '../test.config';
import { HomePage } from '../pages/HomePage';

//Load JSON test data logindata.json

const jsonPath="testdata/logindata.json";
const jsonTestData=DataProvider.getTestDataFromJson(jsonPath);


for(let index = 0; index < jsonTestData.length; index++)
{
   const data = jsonTestData[index];
   test(`Login with JSON: ${data.testName || `Test ${index}`} @datadriven`, async({page})=>
    {

        const config = new TestConfig(); // create instance
        await page.goto(config.appUrl);    // getting appURL from test.config.ts file

        const homePage = new HomePage(page);
        await homePage.clickMyAccount();
        await homePage.clickLogin();

        const loginPage = new LoginPage(page);
        //await loginPage.completeLogin({ Username: data.email, Password: data.password });
        await loginPage.EnterUsername(data.email);
        await loginPage.EnterPassword(data.password);
        await loginPage.clickLoginBtn();
        
        //if (data.expected.toLowerCase() === 'success')
        
          const confirmationMessage = await loginPage.getAccountmsgConfirmation();
          expect(confirmationMessage).toBe('My Account'); //Partial match use 'tocontain()' , full match use 'toBe() / toEqual()' 
        
       
    })

}


//Load CSV test data logindata.json

const csvPath = "testdata/logindata.csv";
const csvTestData = DataProvider.getTestDataFromCsv(csvPath);


for(let index = 0; index < csvTestData.length; index++)
{
  const data = csvTestData[index];
  test(`Login with csv: ${data.testName} [${index}] @datadriven`, async({page})=>
{
        const config = new TestConfig();
        await page.goto(config.appUrl);    // getting appURL from test.config.ts file

        const homePage = new HomePage(page);
        await homePage.clickMyAccount();
        await homePage.clickLogin();

        const loginPage = new LoginPage(page);
        //await loginPage.completeLogin({ Username: data.email, Password: data.password });
        await loginPage.EnterUsername(data.email);
        await loginPage.EnterPassword(data.password);
        await loginPage.clickLoginBtn();
        
        const confirmationMessage = await loginPage.getAccountmsgConfirmation();
        expect(confirmationMessage).toBe('My Account'); //Partial match use 'tocontain()' , full match use 'toBe() / toEqual()' 
})

}
