import { TestConfig } from "../test.config";
import { CheckoutPage } from "../pages/CheckoutPage";
import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { SearchResultsPage } from "../pages/SearchResultsPage";
import { ProductPage } from "../pages/ProductPage";
import { ShoppingCartPage } from "../pages/ShoppingCartPage";
import { LoginPage } from "../pages/LoginPage";
import { LogOutPage } from "../pages/LogoutPage";
import { RandomDataUtil } from "../utils/randomDataGenerator";

// Declare reusable variables
let config: TestConfig;
let homePage: HomePage;
let shoppingCartPage: ShoppingCartPage;
let checkoutPage: CheckoutPage;

test.beforeEach(async ({ page }) => {
    config = new TestConfig(); // Load configuration values like URL and product name
    await page.goto(config.appUrl); // Step 1: Navigate to the application

    // Initialize page objects
    homePage = new HomePage(page);
    shoppingCartPage = new ShoppingCartPage(page);
    checkoutPage = new CheckoutPage(page);
});

// Playwright hook - runs after each test (optional cleanup)
test.afterEach(async ({ page }) => {
    await page.close(); // Closes the browser tab after test
});

// test for checkout page

test('Checkout page test', async ({ page }) => {
    await shoppingCartPage.clickOnCheckout(); // Navigate to checkout page

    // Verify checkout page is loaded
    expect(await checkoutPage.isCheckoutPageExists()).toBeTruthy();

    //Guest checkout option selection and continue
    await checkoutPage.chooseCheckoutOption("guest");
    await checkoutPage.clickOnContinue();
    
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
)