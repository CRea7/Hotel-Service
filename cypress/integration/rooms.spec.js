const roomURL = "http://localhost:3000/rooms/";
const logURL = "http://localhost:3000/users/login/";

describe("Manage rooms page", () => {
    beforeEach(() => {
        cy.fixture("user").then(users => {
            let [d1] = users;
            let one = [d1];
            one.forEach(user => {
                cy.request("POST", logURL,user);
            });
        });

        cy.request(roomURL)
            .its("body")
            .then(rooms => {
                rooms.forEach(element => {
                    cy.request("DELETE", `${roomURL}${element._id}`);
                });
            });
        // Populate API's datastore
        cy.fixture("rooms").then(rooms => {
            let [d1, d2, d3, d4, ...rest] = rooms;
            let four = [d1, d2, d3, d4];
            four.forEach(room => {
                cy.request("POST", roomURL, room);
            });
        });
        // Delete all guests in the API's datastore
        cy.visit("/");
        // Click Manage guests navbar link
        cy.get(".navbar-nav")
            .eq(0)
            .find(".nav-item")
            .eq(3)
            .click();
    });
    describe("to send room for maintenance", () => {
        it("room state should be changed to maintain", () => {
            cy.get("tbody")
                .find("tr")
                .should("have.length", 4);
            // Click trash/delete link of 3rd donation in list
            cy.get("tbody")
                .find("tr")
                .eq(1)
                .find("td")
                .eq(6)
                .find("a")
                .click();
            // Click confirmation button
            cy.get("tbody")
                .find("tr")
                .eq(1)
                .find("td")
                .eq(3)
                .invoke('text').should('include', 'Maintain')
        });
    });
    describe("should set the room to ready", () => {
        it("leaves the list unchanged", () => {
            cy.get("tbody")
                .find("tr")
                .should("have.length", 4);
            // Click trash/delete link of 3rd donation in list
            cy.get("tbody")
                .find("tr")
                .eq(2)
                .find("td")
                .eq(5)
                .find("a")
                .click();
            // Click cancel button
            cy.get("tbody")
                .find("tr")
                .eq(2)
                .find("td")
                .eq(3)
                .invoke('text').should('include', 'Ready')
        });
    });
});
