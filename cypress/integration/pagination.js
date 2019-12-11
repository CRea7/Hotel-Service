const apiURL = "https://donations-api-staging.herokuapp.com/donations/";

describe("Manage Donations page - Pagination", () => {
  beforeEach(() => {
    cy.request(apiURL)
      .its("body")
      .then(donations => {
        donations.forEach(element => {
          cy.request("DELETE", `${apiURL}${element._id}`);
        });
      });
    cy.fixture("donations").then(donations => {
      donations.forEach(donation => {
        cy.request("POST", apiURL, donation);
      });
    });
    cy.visit("/");
    cy.get(".navbar-nav")
      .eq(0)
      .find(".nav-item")
      .eq(1)
      .click();
  });

  it("displays first 10 donations only", () => {
    cy.get("tbody")
      .find("tr")
      .should("have.length", 10);
    cy.get("tbody")
      .find("tr")
      .its("length")
      .should("be.lt", 11);
    cy.get("tbody")
      .find("tr")
      .eq(9)
      .find("td")
      .eq(2)
      .should("contain", 10000); //its('length').should('be.lt',11)
  });

  it("starts at the 11th donation on the next page", () => {
    cy.get("ul.pagination")
      .find("li")
      .eq(2)
      .next()
      .click(); // 2nd page link
    cy.get("tbody")
      .find("tr")
      .should("have.length", 6);
    cy.get("tbody")
      .find("tr")
      .eq(0)
      .find("td")
      .eq(2)
      .should("contain", 11000); //its('length').should('be.lt',11)
  });
});
