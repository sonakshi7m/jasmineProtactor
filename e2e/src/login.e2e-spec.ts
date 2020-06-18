
import { browser, protractor } from 'protractor';
import { LoginPage } from './login.po';

describe('Login tests', () => {
    let page: LoginPage;
    const EC = protractor.ExpectedConditions;
    beforeEach(() => {
        page = new LoginPage();
        page.navigateTo();
    });

    it('should display page with login form and title Login', () => {
        page.navigateTo();
        expect(page.pageTitleText.getText()).toEqual('Login');
        browser.sleep(2000);
    });

    it('should have correct titles and button text', () => {
        //expect(page.usernameLabel.getText()).toEqual('Username');
        //expect(page.passwordLabel.getText()).toEqual('Password');
        expect(page.loginButton.getText()).toEqual('Login');
    });

    it('should display an error message to the user if they provided incorrect credentials', () => {
        page.username.sendKeys('test');
        page.password.sendKeys('');
        page.loginButton.click();
        browser.wait(EC.visibilityOf(page.errorMessage));
        expect(page.errorMessage.getText()).toEqual('Password is required');
    });

    it('should redirect the user to the dashboard in case of correct credentials', () => {

        page.username.sendKeys('test');
        page.password.sendKeys('test@123');
        page.loginButton.click();
        browser.sleep(2000);
        page.navigateToDashboard();
        browser.sleep(2000);
        expect(page.dashBoardTitle.getText()).toEqual('Welcome to Dashboard!');;
        expect(page.dashBoardTitle.isPresent()).toBeTruthy();
    });
});