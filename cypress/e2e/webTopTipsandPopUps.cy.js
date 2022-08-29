const { Tooltip } = require("chart.js");
const { isExportDeclaration } = require("typescript");

describe("Tooltips and PopUps", async () => {
  it("toolTip", () => {
    cy.visit("/");
    cy.contains("Modal & Overlays").click();
    cy.contains("Tooltip").click();
    cy.contains("nb-card", "Colored Tooltips").contains("Default").click();
    //cy.get("nb-tooltip").should("contain", "This is a tooltip");
  });

  it("test dialog box", () => {
    cy.visit("/");
    cy.contains("Modal & Overlays").click();
    cy.contains("Dialog").click();
    cy.contains("nb-card", "Open Dialog").click();
  });

  it.only("window dialog box", () => {
    cy.visit("/");
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();
    //1
    cy.get("tbody tr").first().find(".nb-trash").click();
    // cy.on("window:confirm", (confirm) => {
    //   cy.log(confirm);
    //   expect(confirm).to.equal("Are you sure you want to delete?");
    // });

    const stub = cy.stub();
    cy.log("stub", stub);
    cy.on("window:confirm", stub);
    cy.get("tbody tr")
      .first()
      .find(".nb-trash")
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(
          "Are you sure you want to delete?"
        );
      });
    cy.on("window:confirm", () => false); //
  });
});
