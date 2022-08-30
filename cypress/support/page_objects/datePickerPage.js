
function selecDayFromCurrent(day) {

    let date = new Date();
    date.setDate(date.getDate() + day);
    let futureDay = date.getDate();
    let futureMonth = date.toLocaleString("default", { month: "short" });
    let dateAssert = `${futureMonth} ${futureDay}, ${date.getFullYear()}`;
    cy.get("nb-calendar-navigation")
        .invoke("attr", "ng-reflect-date")
        .then((dateAttr) => {
            if (!dateAttr.includes(futureMonth)) {
                cy.get('[data-name="chevron-right"]').click();
                selecDayFromCurrent(day);
            } else {
                cy.get(
                    'nb-calendar-day-picker [class="day-cell ng-star-inserted"]'
                )
                    .contains(futureDay)
                    .click();
            }
        });
    return dateAssert

}

export class DatePickerDateFromToday {

    selectCommonDatepickerDateFromToday(dateFromToday) {
        cy.contains("nb-card", "Common Datepicker")
            .find("input")
            .then((input) => {
                cy.wrap(input).click();
                let dateAssert = selecDayFromCurrent(dateFromToday)
                cy.wrap(input).invoke("prop", "value").should("contain", dateAssert);
                cy.wrap(input).should("have.value", dateAssert);


            })
    }

}

export const onDatePickerPage = new DatePickerDateFromToday()
