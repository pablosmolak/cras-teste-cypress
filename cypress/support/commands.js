Cypress.Commands.add("logar", (email,senha) => {
    cy.visit("https://front-cras.app.fslab.dev")
    cy.get('#email').type(email)
    cy.get('#senha').type(senha)
    cy.get(`.styles_button__dr0t2`).click()
  });

Cypress.Commands.add("usuarios", () => {
    cy.get(`.styles_button__dr0t2`).click();
    cy.get(".styles_buttonMenu__mmyUS > img").click()
    cy.wait(1000)
    cy.get('.styles_containerMenuActive__rbsm9 > .styles_container__3i7hL > .styles_containerLinks__v9CCT > [href="/usuarios/listar"]').click()
    cy.wait(1000)
    cy.get(".styles_buttonMenu__mmyUS > img").click()
    cy.wait(1000)
});

Cypress.Commands.add("tipo_atendimentos", () => {
  cy.get(`.styles_button__dr0t2`).click();
  cy.get(".styles_buttonMenu__mmyUS > img").click()
  cy.wait(1000)
  cy.get('.styles_containerMenuActive__rbsm9 > .styles_container__3i7hL > .styles_containerLinks__v9CCT > [href="/atendimentos/tipo"] > .styles_containerLinkText__Rz0Qr').click()
  cy.wait(1000)
  cy.get(".styles_buttonMenu__mmyUS > img").click()
  cy.wait(1000)
})

Cypress.Commands.add("pessoas", () => {
  cy.get(`.styles_button__dr0t2`).click();
  cy.get(".styles_buttonMenu__mmyUS > img").click()
  cy.wait(1000)
  cy.get('.styles_containerMenuActive__rbsm9 > .styles_container__3i7hL > .styles_containerLinks__v9CCT > [href="/pessoas/listar"]').click()
  cy.wait(1000)
  cy.get(".styles_buttonMenu__mmyUS > img").click()
  cy.wait(1000)
})

Cypress.Commands.add("atendimentos", () => {
  cy.get(`.styles_button__dr0t2`).click();
  cy.get(".styles_buttonMenu__mmyUS > img").click()
  cy.wait(1000)
  cy.get('.styles_containerMenuActive__rbsm9 > .styles_container__3i7hL > .styles_containerLinks__v9CCT > [href="/atendimentos/listar"]').click()
  cy.wait(1000)
  cy.get(".styles_buttonMenu__mmyUS > img").click()
  cy.wait(1000)
})

Cypress.Commands.add("perfil", () => {
  cy.get(`.styles_button__dr0t2`).click();
  cy.get(".styles_buttonMenu__mmyUS > img").click()
  cy.wait(1000)
  cy.get('.styles_containerMenuActive__rbsm9 > .styles_container__3i7hL > .styles_containerLinks__v9CCT > [href="/usuarios/perfil"]').click()
  cy.wait(1000)
  cy.get(".styles_buttonMenu__mmyUS > img").click()
  cy.wait(1000)
})
  