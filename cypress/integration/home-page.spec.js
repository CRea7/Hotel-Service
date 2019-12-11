describe("Home page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Shows a header", () => {
    cy.get(".vue-title").should("contain", "Homer for President !!");
  });

  describe("Navigation bar", () => {
    it("Shows the required links", () => {
      cy.get(".navbar-nav")
        .eq(0)
        .within(() => {
          cy.get(".nav-item")
            .eq(0)
            .should("contain", "Home");
          cy.get(".nav-item")
            .eq(1)
            .should("contain", "Manage");
          cy.get(".nav-item")
            .eq(2)
            .should("contain", "Donate");
          cy.get(".nav-item")
            .eq(3)
            .should("contain", "Map");
        });
      cy.get(".navbar-nav")
        .eq(1)
        .within(() => {
          cy.get(".nav-item")
            .eq(0)
            .should("contain", "About");
          cy.get(".nav-item")
            .eq(1)
            .should("contain", "Contact");
        });
    });

    it("Redirects when links are clicked", () => {
      cy.get("[data-test=donatebtn]").click();
      cy.url().should("include", "/donate");
      cy.get(".navbar-nav")
        .eq(0)
        .find(".nav-item")
        .eq(1)
        .click();
      cy.url().should("include", "/donations");
      // etc
    });
  });
});
