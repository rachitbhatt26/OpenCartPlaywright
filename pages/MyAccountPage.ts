/* Order History/Transaction/Logout */

import { Page, Locator, expect } from '@playwright/test';
export class MyAccountPage 
{
    private readonly page: Page;

    //private readonly  Locator;
    private readonly OrderHist: Locator;
    private readonly Transactions: Locator;
    private readonly OrderHistMsgConfirmation : Locator ;
    private readonly ConfirmTransactionsHeader : Locator ;

    //constructor

    constructor(page: Page) 
    {
        this.page = page;

        // Initialize locators 
        this.OrderHist = page.locator('//ul[@class="dropdown-menu dropdown-menu-right"]//a[normalize-space()="Order History"]');
        this.Transactions = page.locator('//ul[@class="dropdown-menu dropdown-menu-right"]//a[normalize-space()="Transactions"]');
        this.OrderHistMsgConfirmation = page.locator('//h1[normalize-space()="Order History"]')
        this.ConfirmTransactionsHeader=page.locator ('//h1[normalize-space()="Your Transactions"]')
    }
    // action method

    // Click & Enter/Validate Order History
    async ClickOrderHist() {
        try {
            await this.OrderHist.click();
        }
        catch (error) {
            console.log(`Exception occurred while entering OrderHist: ${error}`);
            throw error;
        }
    }
// Click & Enter/Validate Transactions
    async ClickTransactions() {
        try {
            await this.Transactions.click();
        }
        catch (error) {
            console.log(`Exception occurred while clicking 'My Tran': ${error}`);
            throw error;
        }
    }

  async ValOrderHistMsgConfirmation(): Promise<string> 
  {
        return await this.OrderHistMsgConfirmation.textContent() ?? '';
  }

    async ValConfirmTransactionsHeader(): Promise<string> 
  {
        return await this.ConfirmTransactionsHeader.textContent() ?? '';
  }

//MyAccount Validation

    async completeMyAcc(userData: {
        Username: string;
        Password: string;
    }): Promise<void> {
        
        //Order History tab validation
        await this.OrderHist.click();
        await expect(this.OrderHistMsgConfirmation).toBeVisible();

        //My Transactions tab validation
        await this.Transactions.click();
        await expect(this.ConfirmTransactionsHeader).toBeVisible();
    
    
    }

}

