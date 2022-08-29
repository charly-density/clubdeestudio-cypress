/// <reference types="cypress" />

describe('Our first test suite', async () => {
  it('First test', () => {
    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();

    // By Tag name
    cy.get('input');

    // By ID
    cy.get('#inputEmail');

    // By Class name
    cy.get('.input-full-width');

    // By Attribute name
    cy.get('[placeholder]');

    // By Attribute name and value
    cy.get('[placeholder="Email"]');

    // By Class value
    cy.get('[class="input-full-width size-medium shape-rectangle"]');

    // By Tag name and Attribute with value
    cy.get('input[placeholder="Email"]');

    // By Two different Attributes
    cy.get('[placeholder="Email"][type="email"]');
  })

  it('Second test', () => {
    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();

    cy.get('[data-cy="signInButton"]');

    cy.contains('Sign in');

    cy.contains('[status="warning"]', 'Sign in');

    cy.get('#inputEmail3')
      .parents('form')
      .find('button')
      .should('contain', 'Sign in')
      .parents('form')
      .find('nb-checkbox')
      .click();
  })

  it('then and wrap methods', () => {
   /*  cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();

    // Refactor this
    cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email');
    cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password');
    cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain', 'Email address');
    cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain', 'Password'); */

    // Selenium style
    /* const firstForm = cy.contains('nb-card', 'Using the Grid');
    const secondForm = cy.contains('nb-card', 'Basic form');

    firstForm.find('[for="inputEmail1"]').should('contain', 'Email');
    firstForm.find('[for="inputPassword2"]').should('contain', 'Password');
    secondForm.find('[for="exampleInputEmail1"]').should('contain', 'Email address');
    secondForm.find('[for="exampleInputPassword1"]').should('contain', 'Password'); */

    cy.contains('nb-card', 'Using the Grid').then(firstForm => {
      const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text();
      const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text();

      expect(emailLabelFirst).to.equal('Email');
      expect(passwordLabelFirst).to.equal('Password');

      cy.contains('nb-card', 'Basic form').then(secondForm => {
        const passwordLabelSecond = secondForm.find('[for="exampleInputPassword1"]').text();

        expect(passwordLabelFirst).to.equal(passwordLabelSecond);

        cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain', 'Password');
      })
    })
  })

  it('invoke command', () => {
    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();

    // 1
    cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address');

    // 2
    cy.get('[for="exampleInputEmail1"]').then(label => {
      expect(label.text()).to.equal('Email address');
    })

    // 3
    cy.get('[for="exampleInputEmail1"]').invoke('text').then(text => {
      expect(text).to.equal('Email address');
    })

    cy.contains('nb-card', 'Basic form')
      .find('nb-checkbox')
      .click()
      .find('.custom-checkbox')
      .invoke('attr', 'class')
      //.should('contain', 'checked');
      .then(classValue => {
        expect(classValue).to.contain('checked');
      })

  })

  it('asserts datepicker property', () => {
    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Datepicker').click();

    cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
      cy.wrap(input).click();
      cy.get('nb-calendar-day-picker').contains("17").click();
      cy.wrap(input).invoke("prop", "value").should('contain', 'Aug 17, 2022');
    })
  })

  it('radio button', () => {
    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();

    cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(radioButtons => {
      cy.wrap(radioButtons)
        .first()
        .check({
          force: true
        })
        .should('be.checked');

      cy.wrap(radioButtons)
        .eq(1)
        .check({
          force: true
        })
        .should('be.checked');

      cy.wrap(radioButtons)
        .eq(0)
        .should('not.be.checked');

      cy.wrap(radioButtons)
        .eq(2)
        .should('be.disabled');
    })
  })

  it('checkboxes', () => {
    cy.visit('/');
    cy.contains('Modal & Overlays').click();
    cy.contains('Toastr').click();

    cy.get('[type="checkbox"]').check({
      force: true
    });

    cy.get('[type="checkbox"]').eq(0).click({
      force: true
    });
  })

  it.only('Lists and dropdowns', () => {
    cy.visit('/');

    // Assert theme is dark
    cy.get('nav nb-select').click();
    cy.get('.options-list').contains('Dark').click();
    cy.get('nav nb-select').should('contain', 'Dark');
    cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)');

    // 2
    const colors = {
      "Light": "rgb(255, 255, 255)",
      "Dark": "rgb(34, 43, 69)",
      "Cosmic": "rgb(50, 50, 89)",
      "Corporate": "rgb(255, 255, 255)",
    };

    cy.get('nav nb-select').then(dropdown => {
      cy.wrap(dropdown).click();
      cy.get('.options-list nb-option').each((lisItem, index) => {
        const itemText = lisItem.text().trim();

        cy.wrap(lisItem).click();
        cy.wrap(dropdown).should('contain', itemText);
        cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText]);
        if (index < 3) {
          cy.wrap(dropdown).click();
        }
      })
    })
  })
})
