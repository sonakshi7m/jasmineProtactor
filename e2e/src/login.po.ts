import { browser, by, element } from 'protractor';

export class LoginPage {
    navigateTo() {
        return browser.get('/login');
    }

    navigateToDashboard() {
        return browser.get('/dashboard');
    }

    get dashBoardTitle() {
        return element(by.css('h2'));
    }

    get pageTitleText() {
        return element(by.css('h2'));
    }


    get loginButton() {
        return element(by.className('btn-login'));
    }

    getLoginForm() {
        return element(by.id('loginForm'));
    }

    // get usernameLabel() {
    //     return element(by.css('#loginForm:nth-child(1) label'));
    // }

    // get passwordLabel() {
    //     return element(by.css('#loginForm:nth-child(2) label'));
    // }

    get username() {
        return element(by.id('username'));
    }
    get password() {
        return element(by.id('password'));
    }

    get errorMessage() {
        return element(by.className('invalid-feedback'));
    }

    trySignIn(username: string, password: string) {
        this.username.sendKeys(username);
        this.password.sendKeys(password);
        this.loginButton.click();
    }
}