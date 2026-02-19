import { Page, Locator, expect } from '@playwright/test';
export class LogOutPage 
{
    private readonly page: Page;

    //private readonly  Locator;
    private readonly Logout: Locator;
    private readonly LogoutConfirmMsg :Locator ;
    private readonly ContinueToLogout: Locator;

    //constructor

    constructor(page: Page) 
    {
        this.page = page;
        // Initialize locators 
        this.Logout = page.locator('//a[@class="list-group-item"][normalize-space()="Logout"]')
        this.LogoutConfirmMsg=page.locator('//h1[normalize-space()="Account Logout"]')
        this.ContinueToLogout=page.locator('//a[normalize-space()="Continue"]')

    }

    // action method

    // Click & Logout
    
// Log Out
    async LogoutMyAcc() {
        try {
            await this.Logout.click();
        }
        catch (error) {
            console.log(`Exception occurred while Loggin out: ${error}`);
            throw error;
        }
    }

   async ValLogoutConfirmMsg(): Promise<string> 
  {
        return await this.LogoutConfirmMsg.textContent() ?? '';
  }
//Click continue to confirm Logout
async ClickContinueToConfirmLogout() 
{
    await this.ContinueToLogout.click();
    
}
//LogOut Validation

    async LogOff(userData: {
        Username: string;
        Password: string;
    }): Promise<void> {
        
       //Logout
        await this.Logout.click();
        await expect(this.LogoutConfirmMsg).toBeVisible();
    }

}

