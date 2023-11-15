/// <reference types="cypress"/>
import faker from "faker-br"

const nome = faker.name.firstName()
const sobrenome = faker.name.lastName()
const nomeCompleto = nome + " " + sobrenome
const email = faker.internet.email()

describe('Login', () => {
    
  beforeEach(() => {
    cy.logar(Cypress.env('email'),Cypress.env('senha'))
    cy.usuarios()
  })

  it("Deve realizar realizar cadastro de um usuário com status ativo - cenário de sucesso", () => {   
    cy.get(":nth-child(5) > .styles_button__dr0t2").click()
    cy.get("#nomeCadastrar").type(nomeCompleto);
    cy.get("#emailCadastrar").type(email)
    cy.get("#senhaCadastrar").type("P@blo1234");
    cy.get("#unidadeCadastrar").select("CRAS - Vilhena");
    cy.get("#grupoCadastrar").select("Administrador")
    cy.get(`[type="submit"]`).click()
    cy.contains("Usuário cadastrado com sucesso")
  })

  context("Deve retornar as mensagens de validação ao cadastrar usuário", () => {
    it("Campos obrigatório", () => {
      cy.get(":nth-child(5) > .styles_button__dr0t2").click()
      cy.wait(1000)
      cy.get(`[type="submit"]`).click();
      cy.contains("Nome é obrigatório")
      cy.contains("Email é obrigatório")
      cy.contains("Senha é obrigatório")
      cy.contains("Unidade é obrigatório")
      cy.contains("Grupo é obrigatório")
    })

    it("Senha fraca", () => {
      cy.get(".styles_buttonMenu__mmyUS > img").click();
      cy.wait(1000)
      cy.get('.styles_containerMenuActive__rbsm9 > .styles_container__3i7hL > .styles_containerLinks__v9CCT > [href="/usuarios/listar"]').click();
      cy.get(".styles_buttonMenu__mmyUS > img").click();
      cy.get(":nth-child(5) > .styles_button__dr0t2").click()
      cy.get("#nomeCadastrar").type("pablim");
      cy.get("#emailCadastrar").type("pablim111111111@gmail.com")
      cy.get("#senhaCadastrar").type("P@blo");
      cy.get("#unidadeCadastrar").select("CRAS - Vilhena")
      cy.get("#grupoCadastrar").select("Administrador")
      cy.get(`[type="submit"]`).click()
      cy.contains("Senha é obrigatória e deve ter no mínimo 8 caracteres, letras maiúsculas, minúsculas, números e caracteres especiais!")
    })

    it("Email ja cadastrado", () => {
      cy.get(".styles_buttonMenu__mmyUS > img").click();
      cy.wait(1000)
      cy.get('.styles_containerMenuActive__rbsm9 > .styles_container__3i7hL > .styles_containerLinks__v9CCT > [href="/usuarios/listar"]').click();
      cy.get(".styles_buttonMenu__mmyUS > img").click();
      cy.get(":nth-child(5) > .styles_button__dr0t2").click()
      cy.get("#nomeCadastrar").type(nomeCompleto);
      cy.get("#emailCadastrar").type(email)
      cy.get("#senhaCadastrar").type("P@blo1234");
      cy.get("#unidadeCadastrar").select("CRAS - Vilhena");
      cy.get("#grupoCadastrar").select("Administrador")
      cy.get("span.styles_slider__0TNp_").click()
      cy.get(`[type="submit"]`).click()
    })
  })

  it("Deve retornar uma consulta do usuário cadastrado com status ativo - cenário de sucesso", () => {
    cy.get('#nome').type('Anailza');
    cy.get('[type="submit"]').click()
    cy.wait(500)
    cy.get(':nth-child(1) > :nth-child(1)').contains('Anailza')
  })
  
  it("Deve visualizar as informações de um usuário - cenário de sucesso", () => {
    cy.get(':nth-child(1) > :nth-child(5) > .styles_container__NSLBw > [alt="Informação do usuário"]').click()
    cy.wait(2000)
    cy.get(".styles_btnClose__C5d6D").click()
  })

  it("Deve atualizar os dados de um usuário - cenário de sucesso", () => {
    cy.get(':nth-child(1) > :nth-child(5) > .styles_container__NSLBw > [alt="Atualizar usuário"]').click()
    cy.wait(1000)
    cy.get('#nome').clear()
    cy.get('#nome').type("Cleitin da silva");
    cy.get('[type="submit"]').click()
    cy.contains("Usuário atualizado com sucesso")
    cy.wait(500)
  })
})
