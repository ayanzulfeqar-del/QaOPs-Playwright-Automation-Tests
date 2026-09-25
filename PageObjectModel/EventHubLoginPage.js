class EventHubLoginPage {
  constructor(page, baseUrl) {
    this.page = page;
    this.baseUrl = baseUrl;
    this.email = page.getByRole('textbox', { name: 'Email' });
    this.password = page.getByRole('textbox', { name: 'Password' });
    this.signInButton = page.getByRole('button', { name: 'Sign In' });
    this.alert = page.getByText('Invalid email or password', { exact: true });
  }

  async goto() {
    await this.page.goto(`${this.baseUrl}/login`);
  }

  async login(email, password) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.signInButton.click();
  }

  async loginWithAccount(account) {
    await this.login(account.email, account.password);
  }
}

module.exports = { EventHubLoginPage };
