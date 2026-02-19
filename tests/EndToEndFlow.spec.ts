/**
 * Test Case: End-to-End Test on Demo E-commerce Application
 *
 * Purpose:
 * This test simulates a complete user flow on an e-commerce site.
 * 
 * Steps:
 * 1) Register a new account
 * 2) Logout after registration
 * 3) Login with the same account
 * 4) Search for a product and add it to the shopping cart
 * 5) Verify cart contents
 * 6) Attempt checkout (disabled since feature isn't available on demo site)
 */

import { test, expect, Page } from '@playwright/test';
import { RandomDataUtil } from '../utils/randomDataGenerator';
import { HomePage } from '../pages/HomePage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { TestConfig } from '../test.config';
import { LogOutPage } from '../pages/LogoutPage';
import { LoginPage } from '../pages/LoginPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { ProductPage } from '../pages/ProductPage';
import { ShoppingCartPage } from '../pages/ShoppingCartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { console } from 'inspector';

// This is the main test block that runs the entire flow
test('execute end-to-end test flow @end-to-end', async ({ page }) => {
    const config = new TestConfig();

    // Navigate to the application's home page
    await page.goto(config.appUrl);

    // Step 1: Register a new account and capture the generated email
    let registeredEmail: string = await performRegistration(page);
    console.log("✅ Registration is completed!");

    // Step 2: Logout after successful registration
    await performLogout(page);
    console.log("✅ Logout is completed!");

    // Step 3: Login with the registered email
    await performLogin(page, registeredEmail);
    console.log("✅ Login is completed!");

    // Step 4: Search for a product and add it to the cart
    await addProductToCart(page);
    console.log("✅ Product added to cart!");

    // Step 5: Verify the contents of the shopping cart
    await verifyShoppingCart(page);
    console.log("✅ Shopping cart verification completed!");

    // Step 6: Perform checkout (skipped for demo site)
    /*await performCheckout(page);
    console.log("✅ Checkout process completed!"); */
    
});


// Function to register a new user account
async function performRegistration(page: Page): Promise<string> {
    const homePage = new HomePage(page);
    await homePage.clickMyAccount();       // Click "My Account" link
    await homePage.clickRegister();        // Click "Register" option

    const registrationPage = new RegistrationPage(page);

    // Fill in random user details
    await registrationPage.setFirstName(RandomDataUtil.getFirstName());
    await registrationPage.setLastName(RandomDataUtil.getLastName());

    let email: string = RandomDataUtil.getRandomEmail();
    await registrationPage.setEmail(email); //Need email stored in variable to use for login later(Line86)
    await registrationPage.setTelephone(RandomDataUtil.getPhoneNumber());

    await registrationPage.setPassword("test123");
    await registrationPage.setConfirmPassword("test123");

    await registrationPage.setPrivacyPolicy();  // Accept the privacy policy
    await registrationPage.clickContinue();     // Submit the registration form

    // Validate that the registration was successful
    const confirmationMsg = await registrationPage.getConfirmationMsg();
    expect(confirmationMsg).toContain('Your Account Has Been Created!');

    return email; // Return the email for later use in login
}


// Function to log out the current user
async function performLogout(page: Page) {
    const logoutPage = new LogOutPage(page);
    await logoutPage.LogoutMyAcc(); // Click on Logout
    //Logout Confirmation Message Validation
    {
        const confirmationMessage = await logoutPage.ValLogoutConfirmMsg();
        expect(confirmationMessage).toBe('Account Logout'); //Partial match use 'tocontain()' , full match use 'toBe() / toEqual()' 

    }
    //Click Continue to confirm Logout
    await logoutPage.ClickContinueToConfirmLogout();

    const homePage = new HomePage(page);
    expect(await homePage.isHomePageExists()).toBe(true);
    console.log("Logout Successfull, Home Page is displayed");
}


// Function to log in using the registered email
async function performLogin(page: Page, email: string) {
    const config = new TestConfig();
    await page.goto(config.appUrl);  // Reload home page

    const homePage = new HomePage(page);
    await homePage.clickMyAccount();
    await homePage.clickLogin();

    const loginPage = new LoginPage(page);
    await loginPage.EnterUsername(email); // Use the registered email
    await loginPage.EnterPassword("test123");
    //  Proceed for Login submission
    await loginPage.clickLoginBtn();
    // Verify login by checking My Account page
    //submission Confirmation Message Validation
    const confirmationMessage = await loginPage.getAccountmsgConfirmation();
    expect(confirmationMessage).toBe('My Account');
}


// Function to search for a product and add it to cart
async function addProductToCart(page: Page) {
    const homePage = new HomePage(page);

    const config = new TestConfig();
    const productName: string = config.productName;
    const productQuantity: string = config.productQuantity;

    await homePage.enterProductName(productName);
    await homePage.clicksearch(); // Click on search button

    const searchResultsPage = new SearchResultsPage(page);
    // Validate search results page
    expect(await searchResultsPage.isSearchResultsPageExists()).toBeTruthy();

    // Validate that the desired product exists in the results
    expect(await searchResultsPage.isProductExist(productName)).toBeTruthy();

    // Select product and set quantity
    const productPage = await searchResultsPage.selectProduct(productName);
    await productPage?.setQuantity(productQuantity);
    await productPage?.addToCart();  // Add product to shopping cart

    await page.waitForTimeout(3000); // Wait to simulate user delay

    // Confirm product was added
    expect(await productPage?.isConfirmationMessageVisible()).toBe(true);
}


// Function to verify the shopping cart details
async function verifyShoppingCart(page: Page) {
    const productPage = new ProductPage(page);

    // Navigate to shopping cart from product page
    await productPage.clickItemsToNavigateToCart();
    const shoppingCartPage: ShoppingCartPage = await productPage.clickViewCart();

    console.log("🛒 Navigated to shopping cart!");

    const config = new TestConfig();

    // Validate that total price is correct (based on config)
    expect(await shoppingCartPage.getTotalPrice()).toBe(config.totalPrice);
}


// Function to perform checkout (disabled for demo site)
/*async function performCheckout(page: Page) {
      const config = new TestConfig();
    const shoppingCartPage = new ShoppingCartPage(page);
    await shoppingCartPage.clickOnCheckout(); // Navigate to checkout page
    await page.waitForTimeout(2000); // Wait to simulate user delay
    const checkoutPage = new CheckoutPage(page);
    // Verify checkout page is loaded
    expect(await checkoutPage.isCheckoutPageExists()).toBeTruthy();
 await page.waitForTimeout(3000); // Wait to simulate user delay
    //Guest checkout option selection and continue
    await checkoutPage.chooseCheckoutOption("guest");
    await page.waitForTimeout(3000); // Wait to simulate user delay
    await checkoutPage.clickOnContinue();
    console.log("🚚 Proceeding to checkout details as guest...");
    await page.waitForTimeout(3000); // Wait to simulate user delay
    
    //Fill in the checkout form with random data
    await checkoutPage.setFirstName(RandomDataUtil.getFirstName());
    await checkoutPage.setLastName(RandomDataUtil.getLastName());
    await checkoutPage.setAddress1(RandomDataUtil.getRandomAddLine());
    await checkoutPage.setAddress2(RandomDataUtil.getRandomAddLine());
    await checkoutPage.setCity(RandomDataUtil.getRandomCity());
    await checkoutPage.setPin(RandomDataUtil.getRandomPostal());
    await checkoutPage.setCountry(RandomDataUtil.getRandomCountry());
    await checkoutPage.setState(RandomDataUtil.getRandomstate());
    //Continue click after filling billing address
    await checkoutPage.clickOnContinueAfterBillingAddress();
    //Fill in delivery method comment
    await checkoutPage.setDeliveryMethodComment("Please deliver between 9 AM to 5 PM.");
    //selecting terms and conditions and continue to payment method
    await checkoutPage.selectTermsAndConditions();
    await checkoutPage.clickOnContinueAfterDeliveryMethod();

    await checkoutPage.clickOnContinueAfterPaymentMethod();
    const totalPrice = await checkoutPage.getTotalPriceBeforeConfOrder();
    expect(totalPrice).toBe(config.totalPrice);
    // Confirm the order
    await checkoutPage.clickOnConfirmOrder();
    expect(await checkoutPage.isOrderPlaced()).toBeTruthy();
    
}


*/