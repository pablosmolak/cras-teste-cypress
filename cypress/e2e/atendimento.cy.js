/// <reference types="cypress"/>

describe("Atendimentos", () => {
    beforeEach(()=>{
        cy.logar(Cypress.env('email'),Cypress.env('senha'))
        cy.atendimentos()
    })

    it("Deve alterar os dados do atendimento cadastrado", () => {
        cy.get(':nth-child(1) > :nth-child(5) > .styles_container__NSLBw > [alt="Editar Atendimento"]').click()
        cy.get('#observacaoAtendimento').clear()
        cy.get('#observacaoAtendimento').type('Atendimento pouco urgente')
        cy.get('[type="submit"]').click()
        cy.get('.Toastify__toast-body > :nth-child(2)').contains('Atendimento atualizado com sucesso')
    })

    it("Deve retornar msg de onde data inicial é maior que final", () => {
        cy.get('#dataInicial').type('2023-11-15')
        cy.get('#dataFinal').type('2023-11-14')
        cy.get('#buscar').click()
        cy.get('.Toastify__toast-body > :nth-child(2)').contains("Data inicial não pode ser maior ou igual a data final")
    })

    it("Deve realizar busca somente pelo tipo de atendimento", () => {
        cy.get('#tipo').select('SCFV')
        cy.get('#buscar').click()
        cy.get('tbody > :nth-child(1) > :nth-child(4)').contains('SCFV')
    })

    it("Deve realizar busca somente com as datas inicial e final", () => {
        cy.get('#dataInicial').type('2023-11-05')
        cy.get('#dataFinal').type('2023-11-06')
        cy.get('tbody > .styles_tr__2bCIW > :nth-child(3)').contains('06/11/2023')
    })

    it("Deve buscar por tipo de atendimento e alterar os dados do atendimento", () => {
        cy.get('#tipo').select('SCFV')
        cy.get('#buscar').click()
        cy.get('tbody > :nth-child(1) > :nth-child(4)').contains('SCFV')
        cy.get(':nth-child(1) > :nth-child(5) > .styles_container__NSLBw > [alt="Editar Atendimento"]').click()
        cy.wait(2000)
        cy.get('#observacaoAtendimento').clear()
        cy.get('#observacaoAtendimento').type('Atendimento muito demorado')
        cy.get('[type="submit"]').click()
        cy.get('.Toastify__toast-body > :nth-child(2)').contains('Atendimento atualizado com sucesso')
    })

})