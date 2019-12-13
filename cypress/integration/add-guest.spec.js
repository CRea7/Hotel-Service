const apiURL = "https://hotel-api-staging.herokuapp.com/guests/";
const logURL = "https://hotel-api-staging.herokuapp.com/users/login/";

describe("add guest page", () => {
  beforeEach(() => {
    cy.fixture("user").then(users => {
      let [d1] = users;
      let one = [d1];
      one.forEach(user => {
        cy.request("POST", logURL,user);
      });
    });
    cy.request(apiURL)
      .its("body")
      .then(guests => {
        guests.forEach(element => {
          cy.request("DELETE", `${apiURL}${element._id}`);
        });
      });
    cy.fixture("guests").then(guests => {
      let [d1, d2, d3, d4, ...rest] = guests;
      let four = [d1, d2, d3, d4];
      four.forEach(guest => {
        cy.request("POST", apiURL, guest);
      });
    });
    cy.visit("/");
    // Click Donate navbar link
    cy.get(".navbar-nav")
      .eq(0)
      .find(".nav-item")
      .eq(2)
      .click();
  });
  describe("Add a Guest", () => {
    describe("With valid attributes", () => {
      it("allows donation to be submitted", () => {
        //  Fill out web form
        cy.get("#roomtype").select("double");
        cy.get("input[data-test=guest]").type("Conor Rea");
        cy.get("input[data-test=number]").type(2);
        cy.get('#breakfast').select('yes');
        cy.contains("Reservation recived!").should("not.exist");
        cy.get(".error").should("not.exist");
        cy.get("button[type=submit]").click();
        cy.contains("Reservation recived!").should("exist");
      });
      //broke in pc switch will try get back it soon
      after(() => {
        cy.wait(100)
        // Click Manage Guests
        cy.get(".navbar-nav")
        .eq(0)
        .find(".nav-item")
        .eq(1)
        .click();
        // cy.get("tbody")
        //   .find("tr")
        //   .should("have.length", 5);
      });
    });
    describe("With invalid/blank attributes", () => {
      it("shows error messages until all attributes are ", () => {
        cy.get("button[type=submit]").click();
        cy.contains("Please Fill in the Form Correctly.").should("exist");
      });
      after(() => {
        cy.wait(100)
        // Click Manage Guests
        cy.get(".navbar-nav")
        .eq(0)
        .find(".nav-item")
        .eq(1)
        .click();
        cy.get("tbody")
          .find("tr")
          //.should("have.length", 4);
      });
    });
  });
});
