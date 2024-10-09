import { clienteService } from "./cliente-service.js";

const divFormulario = document.getElementById('formulario_cadastro')
const botaoFormulario = document.getElementById('botao_formulario')
const formulario = document.forms.namedItem('cadastro')

window.mostrarFormulario = () => {
    if(divFormulario.style.display === 'none'){
        formulario.reset()
        divFormulario.style.display = 'grid' 
    }else{
        divFormulario.style.display = 'none'
        formulario.reset()
    }
}

botaoFormulario.onclick = () => {
    window.mostrarFormulario()
}

formulario.addEventListener('submit', (e) => {
    e.preventDefault()

    clienteService.salvarCliente(formulario)
})