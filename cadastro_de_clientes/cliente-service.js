import { Cliente } from "./Cliente.js";

const divFormulario = document.getElementById('formulario_cadastro')
const formulario = document.forms.namedItem('cadastro')

let lista_clientes = document.getElementById('lista_clientes')
let clientes = []

function atualizarTemplate(){
    lista_clientes.innerHTML = ''
    clientes.forEach((cliente) => {
        lista_clientes.innerHTML += templateCliente(cliente)
    })
}

function salvarCliente(formulario){
    let id = clientes.length
    clientes.push(new Cliente(formulario, id))
    atualizarTemplate()
    window.mostrarFormulario()
}

window.excluirCliente = (id) => {
    clientes.splice(id,1)
    atualizarTemplate()
}

function templateCliente(cliente){
    return `
        <tr>
            <td>
                ${cliente.nome}
            </td>
            <td>
                ${cliente.email}
            </td>
            <td>
                ${cliente.celular}
            </td>
            <td>
                ${cliente.cidade}
            </td>
            <td>
                <button id="editar_cliente">Editar</button>
                <button id="excluir_cliente">Excluir</button>
            </td>
        </tr>
    `
};

export const clienteService = {
    salvarCliente,

}