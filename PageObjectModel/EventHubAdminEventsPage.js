class EventHubAdminEventsPage {
  constructor(page, baseUrl) {
    this.page = page;
    this.baseUrl = baseUrl;
    this.title = page.getByRole('textbox', { name: 'Title*' });
    this.description = page.getByRole('textbox', { name: 'Describe the event…' });
    this.category = page.getByRole('combobox', { name: 'Category*' });
    this.city = page.getByRole('textbox', { name: 'City*' });
    this.venue = page.getByRole('textbox', { name: 'Venue*' });
    this.dateTime = page.getByRole('textbox', { name: 'Event Date & Time*' });
    this.price = page.getByRole('spinbutton', { name: 'Price ($)*' });
    this.totalSeats = page.getByRole('spinbutton', { name: 'Total Seats*' });
    this.addEventButton = page.getByRole('button', { name: '+ Add Event' });
    this.successAlert = page.getByText('Event created!', { exact: true });
  }

  async goto() {
    await this.page.goto(`${this.baseUrl}/admin/events`);
  }

  async addEvent(event) {
    await this.title.fill(event.title);
    await this.description.fill(event.description);
    await this.category.selectOption({ label: event.category });
    await this.city.fill(event.city);
    await this.venue.fill(event.venue);
    await this.dateTime.fill(event.dateTime);
    await this.price.fill(String(event.price));
    await this.totalSeats.fill(String(event.totalSeats));
    await this.addEventButton.click();
  }

  eventRow(title) {
    return this.page.getByRole('row', { name: new RegExp(title) });
  }

  eventLink(title) {
    return this.page.getByRole('link', { name: title, exact: true });
  }

  async getEventUrl(title) {
    await this.page.goto(`${this.baseUrl}/events`);
    return this.eventLink(title).getAttribute('href');
  }
}

module.exports = { EventHubAdminEventsPage };
