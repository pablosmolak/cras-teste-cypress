/// <reference types="cypress"/>
import faker from "faker-br"
import { mascaraCPF } from "../../utils/formatacpf"

const nome = `${faker.name.firstName()} ${faker.name.lastName()} ${faker.name.lastName()}`
const cpf = faker.br.cpf()

describe("Pessoas", () => {
    beforeEach(()=>{
        cy.logar(Cypress.env('email'),Cypress.env('senha'))
        cy.pessoas()
    })

    it("Deve cadastrar pessoa com todos os campos preenchidos", () => {
        cy.get(':nth-child(4) > .styles_container__NSLBw > #buscar').click()
        cy.wait(2000)
        cy.get('#nome').type(nome)
        cy.get('#cpf').type(cpf)
        cy.get('#nit').type(cpf)
        cy.get('#dataNascimento').type('2000-09-22')
        cy.get('#bairro').type("BNH")
        cy.get('#logradouro').type('Rua 524')
        cy.get('#cep').type('76980-214')
        cy.get('#numero').type('125')
        cy.get('#telefone').type("69984227163")
        cy.get('#telefoneContato').type('robertinho')
        cy.get('[type="submit"]').click()
        cy.get('.Toastify__toast-body > :nth-child(2)').contains("Pessoa cadastrada com sucesso")
    })

    it("Deve retornar msg de campos obrigatórios", () => {
        cy.get(':nth-child(4) > .styles_container__NSLBw > #buscar').click()
        cy.wait(2000)
        cy.get('[type="submit"]').click()
        cy.wait(1000)
        cy.get(':nth-child(1) > .styles_errorMessage__IKSlh').contains('Nome é obrigatório')
        cy.get(':nth-child(4) > .styles_errorMessage__IKSlh').contains('Data de nascimento é obrigatório')
        cy.wait(1000)
    })

    it("Deve buscar uma pessoa pelo nome e alterar seus dados", () => {
        cy.get(':nth-child(1) > #nome').type(nome)
        cy.get(':nth-child(3) > .styles_container__NSLBw > #buscar').click()
        cy.wait(1000)
        cy.get('tbody > .styles_tr__2bCIW > :nth-child(1)').contains(nome)
        cy.get('[alt="Editar pessoa"]').click()
        cy.get('#bairro').clear()
        cy.get('#bairro').type("Cristo rei")
        cy.get('#telefoneContato').clear()
        cy.get('#telefoneContato').type('Robertão')
        cy.get('[type="submit"]').click()
        cy.get('.Toastify__toast-body > :nth-child(2)').contains("Pessoa atualizada com sucesso")
    })

    it("Deve buscar uma pessoa pelo CPF e alterar seus dados", () => {
        cy.get(':nth-child(2) > #nome').type(mascaraCPF(cpf))
        cy.get(':nth-child(3) > .styles_container__NSLBw > #buscar').click()
        cy.wait(1000)
        cy.get('tbody > .styles_tr__2bCIW > :nth-child(1)').contains(nome)
        cy.get('[alt="Editar pessoa"]').click()
        cy.get('#bairro').clear()
        cy.get('#bairro').type("Cidade Verde")
        cy.get('#telefoneContato').clear()
        cy.get('#telefoneContato').type('Carlão')
        cy.get('[type="submit"]').click()
        cy.get('.Toastify__toast-body > :nth-child(2)').contains("Pessoa atualizada com sucesso")
    })

    it("Deve cadastrar atendimento para a pessoa", () => {
        cy.get(':nth-child(2) > #nome').type(mascaraCPF(cpf))
        cy.get(':nth-child(3) > .styles_container__NSLBw > #buscar').click()
        cy.wait(1000)
        cy.get('[alt="Cadastrar atendimento"]').click()
        cy.wait(1000)
        cy.get('#dataAtendimento').type('2023-11-15')
        cy.get('#tipo').select('SCFV')
        cy.get('#observacao').type('Atendimento urgente')
        cy.get('[type="submit"]').click()
        cy.get('.Toastify__toast-body > :nth-child(2)').contains('Atendimento cadastrado com sucesso')
    })

    it("Deve visualizar os dados da pessoa", () => {
        cy.get(':nth-child(2) > #nome').type(mascaraCPF(cpf))
        cy.get(':nth-child(3) > .styles_container__NSLBw > #buscar').click()
        cy.wait(1000)
        cy.get(':nth-child(1) > :nth-child(5) > .styles_container__NSLBw > [alt="Informações da pessoa"]').click()
        cy.get('.styles_modalHeader__WEL2t > .styles_text__68fzG').contains(`Informações de ${nome}`)
    })

    it("Deve buscar uma pessoa, listar os atendimentos recebidos e alterar os dados", () => {
        cy.get(':nth-child(2) > #nome').type(mascaraCPF(cpf))
        cy.get(':nth-child(3) > .styles_container__NSLBw > #buscar').click()
        cy.wait(1000)
        cy.get(':nth-child(1) > :nth-child(5) > .styles_container__NSLBw > [alt="Ver atendimentos dessa pessoa"]').click()
        cy.wait(1000)
        cy.get(':nth-child(1) > :nth-child(5) > .styles_container__NSLBw > [alt="Editar Atendimento"]').click()
        cy.wait(1000)
        cy.get('#observacaoAtendimento').clear()
        cy.get('#observacaoAtendimento').type('Atendimento Super Urgente')
        cy.get('[type="submit"]').click()
        cy.get('.Toastify__toast-body > :nth-child(2)').contains('Atendimento atualizado com sucesso')
    })
})