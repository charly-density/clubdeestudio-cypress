describe("WebDatePickers", async () => {
  it("select a date", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Datepicker").click();
    cy.contains("nb-card", "Common Datepicker")
      .find("input")
      .then((input) => {
        cy.wrap(input).click();
        cy.get("nb-calendar-day-picker").contains("17").click();
        cy.wrap(input)
          .invoke("prop", "value")
          .should("contain", "Aug 17, 2022");
      });
  });
  it.only("select any date", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Datepicker").click();

    let date = new Date();
    date.setDate(date.getDate() + 200);
    let futureDate = date.getDate();
    //let futureMonth = date.getMonth(); returns month number
    let futureMonth = date.toLocaleString("default", { month: "short" });

    cy.contains("nb-card", "Common Datepicker")
      .find("input")
      .then((input) => {
        cy.wrap(input).click();
        selectDate();
        function selectDate() {
          cy.get("nb-calendar-navigation")
            .invoke("attr", "ng-reflect-date")
            .then((dateAttr) => {
              if (!dateAttr.includes(futureMonth)) {
                cy.get('[data-name="chevron-right"]').click();
                selectDate();
                //cy.get("nb-calendar-day-picker").contains(futureDate).click();
                // cy.get(
                //   'nb-calendar-day-picker [class="day-cell ng-star-inserted"]'
                // )
                //   .contains(futureDate)
                //   .click();
              } else {
                cy.get("nb-calendar-day-picker").contains(futureDate).click();
                //   cy.get(
                //     'nb-calendar-day-picker [class="day-cell ng-star-inserted"]'
                //   )
                //     .contains(futureDate)
                //     .click();
              }
            });
        }

        let dateAssert = `${futureMonth} ${futureDate}, ${date.getFullYear()}`;
        cy.wrap(input).invoke("prop", "value").should("contain", dateAssert);
      });
  });
});
