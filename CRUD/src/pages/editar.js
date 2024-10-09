import { carrosService } from "../service/carros-service.js"
import { Carro } from "../utils/Carro.js"

const formularioEdicao = document.forms.namedItem('editar')


const url = new URL(window.location)
const id = url.searchParams.get('id')

function preencherCamposEdicao(carro){
    formularioEdicao.marca.value = carro.marca
    formularioEdicao.modelo.value = carro.modelo
    formularioEdicao.ano.value = carro.ano
    formularioEdicao.preco.value = carro.preco
    formularioEdicao.quilometragem.value = carro.quilometragem
    formularioEdicao.foto.value = carro.foto
    
}

window.onload = () => {
    carrosService.buscarCarro(id)
        .then(carro => {
            preencherCamposEdicao(carro)
        })
}

window.cancelarEdicao = () => {
    window.location.href = 'carros.html'
}

formularioEdicao.addEventListener('submit', (evento) => {
    evento.preventDefault()

    const carroEditado = new Carro(formularioEdicao)

    carrosService.editarCarro(carroEditado, id)
    .finally(() => window.location.href = 'carros.html')
})