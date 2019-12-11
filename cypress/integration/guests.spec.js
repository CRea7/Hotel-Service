const apiURL = "http://localhost:3000/guests/";
const logURL = "http://localhost:3000/users/login/";

describe("Manage Guests page", () => {
  beforeEach(() => {
    cy.fixture("user").then(users => {
      let [d1] = users;
      let one = [d1];
      one.forEach(user => {
        cy.request("POST", logURL,user);
      });
    });
    // Delete all guests in the API's datastore
    cy.request(apiURL)
      .its("body")
      .then(guests => {
        guests.forEach(element => {
          cy.request("DELETE", `${apiURL}${element._id}`);
        });
      });
    // Populate API's datastore
    cy.fixture("guests").then(guests => {
      let [d1, d2, d3, d4, ...rest] = guests;
      let four = [d1, d2, d3, d4];
      four.forEach(guest => {
        cy.request("POST", apiURL, guest);
      });
    });
    cy.visit("/");
    // Click Manage guests navbar link
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
