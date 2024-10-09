export class Cliente {
    constructor(formulario, id) {
        this.id = id
        this.nome = formulario.nome.value
        this.email = formulario.email.value
        this.celular = formulario.celular.value
        this.cidade = formulario.cidade.value
    }
}