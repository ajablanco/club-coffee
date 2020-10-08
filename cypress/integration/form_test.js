
describe("testing form inputs", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/order-coffee")
    })
    it("meets MVP", () => {
        cy.get("[data-cy=name").type("Aja").should("have.value", "Aja");
        cy.get("[data-cy=phone").type("7604420404").should("have.value", "7604420404");
        cy.get("[data-cy=type]").select("latte").should("have.value", "latte");
        cy.get("[data-cy=temp]").select("hot").should("have.value", "hot");
        cy.get("[data-cy=milk]").select("soy").should("have.value", "soy");
        cy.get("[data-cy=noFoam]").check().should("be.checked");
        cy.get("[data-cy=cinnamon]").check().should("be.checked");
        cy.get("[data-cy=caramel]").check().should("be.checked");
        cy.get("[data-cy=whippedCream]").check().should("be.checked");
        cy.get("[data-cy=instructions]").type("Steam cinnamon").should("have.value", "Steam cinnamon")
        cy.get("[data-cy=submit]").click().should("have.prop", {isDisabled: false});
    })
})

//test that we can select multiple additions √
//test that we can add text to "special instructions" √
//test that we can submit the form √

