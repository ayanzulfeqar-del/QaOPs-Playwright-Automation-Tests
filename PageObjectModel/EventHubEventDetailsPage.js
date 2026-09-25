class EventHubEventDetailsPage {
  constructor(page, baseUrl) {
    this.page = page;
    this.baseUrl = baseUrl;
    this.fullName = page.getByRole('textbox', { name: 'Full Name*' });
    this.email = page.getByRole('textbox', { name: 'Email*' });
    this.phone = page.getByRole('textbox', { name: 'Phone Number*' });
    this.increaseTicketsButton = page.getByRole('button', { name: '+' });
    this.confirmBookingButton = page.getByRole('button', { name: 'Confirm Booking' });
    this.bookingConfirmation = page.getByRole('heading', { name: /Booking Confirmed/ });
  }

  async goto(eventUrl) {
    await this.page.goto(`${this.baseUrl}${eventUrl}`);
  }

  async bookTickets(booking) {
    for (let index = 1; index < booking.tickets; index += 1) {
      await this.increaseTicketsButton.click();
    }
    await this.fullName.fill(booking.fullName);
    await this.email.fill(booking.email);
    await this.phone.fill(booking.phone);
    await this.confirmBookingButton.click();
  }

  async getBookingReference() {
    const confirmation = this.bookingConfirmation.locator('..');
    return confirmation.getByText(/^[A-Z0-9-]+$/).first().textContent();
  }
}

module.exports = { EventHubEventDetailsPage };
