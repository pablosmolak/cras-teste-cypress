/// <reference types="cypress"/>
import faker from "faker-br"

const nomeAtendimento = faker.system.fileName()
const novoNomeAtendimento = faker.system.fileName()

describe("Tipo de Atendimento", ()=>{
    beforeEach(()=>{
        cy.logar(Cypress.env('email'),Cypress.env('senha'))
        cy.tipo_atendimentos()
    })

    it("Deve cadastrar tipo de atendimento com todos os campos preenchidos", () => { 
        cy.get(':nth-child(3) > .styles_container__NSLBw > #buscar').click()
        cy.wait(1000)
        cy.get('#nome').type(nomeAtendimento)
        cy.get('[type="submit"]').click()
        cy.get('.Toastify__toast-body > :nth-child(2)').contains("Tipo de Atendimento cadastrado com sucesso")
        cy.wait(1000)
    })

    it("Deve retornar msg de campos obrigatórios", () => {
        cy.get(':nth-child(3) > .styles_container__NSLBw > #buscar').click()
        cy.wait(1000)
        cy.get('[type="submit"]').click()
        cy.get('.styles_errorMessage__IKSlh').contains('Nome é obrigatório')
        cy.wait(1000)
    })

    it("Deve pesquisar um tipo de atendimento e alterar seu nome",() => {
        cy.get('#tipo').type(nomeAtendimento)
        cy.get(':nth-child(2) > .styles_container__NSLBw > #buscar').click()
        cy.wait(1000)
        cy.get('tbody > .styles_tr__2bCIW > :nth-child(1)').contains(nomeAtendimento)
        cy.get('[alt="Editar tipo de atendimento"]').click()
        cy.wait(1000)
        cy.get('#nome').clear()
        cy.get('#nome').type(novoNomeAtendimento)
        cy.get('[type="submit"]').click()
        cy.get('.Toastify__toast-body > :nth-child(2)').contains("Tipo de Atendimento Atualizado com sucesso")
        cy.wait(1000)
    })
})
