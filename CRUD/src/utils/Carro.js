export class Carro {
    constructor(formulario) {
        this.marca = formulario.marca.value
        this.modelo = formulario.modelo.value
        this.quilometragem = formulario.quilometragem.value
        this.foto = formulario.foto.value
        this.preco = formulario.preco.value
        this.ano = formulario.ano.value
    }
}