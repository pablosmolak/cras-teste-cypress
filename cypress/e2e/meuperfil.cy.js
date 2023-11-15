/// <reference types="cypress"/>
import faker from "faker-br"

const nome = `${faker.name.firstName()} ${faker.name.lastName()} ${faker.name.lastName()}` 
const email = faker.internet.email()
const senha = "P@blo1234"
const novaSenha = "P@smolak123"

describe("Meu Perfil", () => {
    
    it("Deve Cadastrar um usuario para ser usado no teste", () => {   
        cy.logar(Cypress.env('email'),Cypress.env('senha'))
        cy.usuarios()
        cy.get(":nth-child(5) > .styles_button__dr0t2").click()
        cy.get("#nomeCadastrar").type(nome);
        cy.get("#emailCadastrar").type(email)
        cy.get("#senhaCadastrar").type(senha);
        cy.get("#unidadeCadastrar").select("CRAS - Vilhena");
        cy.get("#grupoCadastrar").select("Administrador")
        cy.get(`[type="submit"]`).click()
        cy.contains("Usuário cadastrado com sucesso")
      })

    it("Deve alterar os campos e a senha", () => {
        cy.logar(email,senha)
        cy.perfil()
        cy.get('.styles_button__dr0t2').click()
        cy.get('#senha').type(novaSenha)
        cy.get('#confirmarSenha').type(novaSenha)
        cy.get('.styles_container__NSLBw > .styles_button__dr0t2').click()
        cy.get('.Toastify__toast-body > :nth-child(2)').contains('Senha alterada com sucesso')
        cy.wait(7000)
        cy.get('.styles_buttonMenu__mmyUS > img').click()
        cy.wait(1000)
        cy.get('.styles_containerMenuActive__rbsm9 > .styles_container__3i7hL > .styles_containerLinks__v9CCT > div.styles_containerLink__L2Kg7').click()
        cy.get(':nth-child(2) > .styles_button__dr0t2').click()
        cy.wait(1000)
        cy.logar(email,novaSenha)
        cy.get('.styles_text__68fzG').contains("SEMAST - Pimenta Bueno")
    })
})