class EventHubBookingsPage {
  constructor(page, baseUrl) {
    this.page = page;
    this.baseUrl = baseUrl;
    this.heading = page.getByRole('heading', { name: 'My Bookings' });
  }

  async goto() {
    await this.page.goto(`${this.baseUrl}/bookings`);
  }

  bookingForEvent(eventTitle) {
    return this.page.getByRole('heading', { name: eventTitle, exact: true });
  }

  bookingReference(reference) {
    return this.page.getByText(reference, { exact: true });
  }
}

module.exports = { EventHubBookingsPage };
