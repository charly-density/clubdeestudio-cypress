describe("WebTables", async () => {
  it("Edit a value", () => {
    //first example
    cy.visit("/");
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    cy.get("tbody")
      .contains("tr", "Larry")
      .then((tableRow) => {
        cy.wrap(tableRow).find(".nb-edit").click();
        cy.wrap(tableRow).find('[placeHolder="Age"]').type("25");
        cy.wrap(tableRow).find(".nb-checkmark").click();
        cy.wrap(tableRow).find("td").eq(6).should("contain", "25");
      });
  });

  it("Add new", () => {
    //second example
    cy.visit("/");
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    cy.get("thead").find(".nb-plus").click();
    cy.get("thead")
      .find("tr")
      .eq(2)
      .then((tableRow) => {
        cy.wrap(tableRow).find('[placeholder="First Name"]').type("Artem");
        cy.wrap(tableRow).find('[placeholder="Last Name"]').type("Bondar");
        cy.wrap(tableRow).find(".nb-checkmark").click();
      });

    cy.get("tbody tr")
      .first() //last() eq()
      .find("td")
      .then((tableColumns) => {
        cy.wrap(tableColumns).eq(2).should("contain", "Artem");
        cy.wrap(tableColumns).eq(3).should("contain", "Bondar");
      });
  });

  it.only("Use Filter", () => {
    cy.visit("/");
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    cy.get('thead [placeholder="Age"]').type("20");
    //cy.wait(500);
    cy.get("tbody tr").each((tableRow) => {
      cy.wrap(tableRow).find("td").eq(6).should("contain", 20);
    });
  });
});
