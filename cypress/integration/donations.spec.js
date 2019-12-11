const apiURL = "https://donations-api-staging.herokuapp.com/donations/";

describe("Manage Donations page", () => {
  beforeEach(() => {
    // Delete all donations in the API's datastore
    cy.request(apiURL)
      .its("body")
      .then(donations => {
        donations.forEach(element => {
          cy.request("DELETE", `${apiURL}${element._id}`);
        });
      });
    // Populate API's datastore
    cy.fixture("donations").then(donations => {
      let [d1, d2, d3, d4, ...rest] = donations;
      let four = [d1, d2, d3, d4];
      four.forEach(donation => {
        cy.request("POST", apiURL, donation);
      });
    });
    cy.visit("/");
    // Click Manage Donations navbar link
    cy.get(".navbar-nav")
      .eq(0)
      .find(".nav-item")
      .eq(1)
      .click();
  });
  describe("For a confirmed delete operation", () => {
    it("reduces the no. of donations by 1", () => {
      cy.get("tbody")
        .find("tr")
        .should("have.length", 4);
      // Click trash/delete link of 3rd donation in list
      cy.get("tbody")
        .find("tr")
        .eq(2)
        .find("td")
        .eq(6)
        .find("a")
        .click();
      // Click confirmation button
      cy.get("button")
        .contains("Delete")
        .click();
      cy.get("tbody")
        .find("tr")
        .should("have.length", 3);
    });
  });
  describe("For a cancelled delete operation", () => {
    it("leaves the list unchanged", () => {
      cy.get("tbody")
        .find("tr")
        .should("have.length", 4);
      // Click trash/delete link of 3rd donation in list
      cy.get("tbody")
        .find("tr")
        .eq(2)
        .find("td")
        .eq(6)
        .find("a")
        .click();
      // Click cancel button
      cy.get("button")
        .contains("Cancel")
        .click();
      cy.get("tbody")
        .find("tr")
        .should("have.length", 4);
    });
  });
});
