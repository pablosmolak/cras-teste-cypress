Cypress.Commands.add("logar", () => {
    cy.visit("https://front-cras.app.fslab.dev")
    cy.get('#email').type('dev@gmail.com')
    cy.get('#senha').type('123')
    cy.get(`.styles_button__dr0t2`).click();
  });

Cypress.Commands.add("usuarios", () => {
    cy.get(`.styles_button__dr0t2`).click();
    cy.get(".styles_buttonMenu__mmyUS > img").click();
    cy.wait(1000)
    cy.get('.styles_containerMenuActive__rbsm9 > .styles_container__3i7hL > .styles_containerLinks__v9CCT > [href="/usuarios/listar"]').click();
    cy.wait(1000)
    cy.get(".styles_buttonMenu__mmyUS > img").click();
    cy.wait(1000)
});
  