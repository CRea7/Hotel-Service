const apiURL = "http://localhost:3000/guests/";

describe("add guest page", () => {
    describe("login user", () => {
        describe("With valid attributes", () => {
            it("allows donation to be submitted", () => {
                cy.visit("/#/users/login");
                //  Fill out web form
                cy.get("input[data-test=user]").type("Conor Rea");
                cy.get("input[data-test=password]").type(1234);
                cy.contains("Logged In!").should("not.exist");
                cy.get(".error").should("not.exist");
                cy.get("button[type=submit]").click();
                cy.contains("Logged In!").should("exist");
            });
        });
        describe("With invalid/blank attributes", () => {
            it("shows error messages until all attributes are ", () => {
                cy.visit("/#/users/login");
                cy.get("button[type=submit]").click();
                cy.contains("Please Fill in the Form Correctly.").should("exist");
            });
        });
    });
});