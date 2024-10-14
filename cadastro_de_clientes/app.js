import { Cliente } from "./Cliente.js";

const divFormulario = document.getElementById('formulario_cadastro');
const botaoFormulario = document.getElementById('botao_formulario');
const formulario = document.forms.namedItem('cadastro');

let lista_clientes = document.getElementById('lista_clientes');
let clientes = [];
let tempId = 0;

function templateCliente(cliente) {
    return `
        <tr>
            <td>${cliente.nome}</td>
            <td>${cliente.email}</td>
            <td>${cliente.celular}</td>
            <td>${cliente.cidade}</td>
            <td>
                <button class="editar_cliente" data-id="${cliente.id}">Editar</button>
                <button class="excluir_cliente" data-id="${cliente.id}">Excluir</button>
            </td>
        </tr>
    `;
}

function atualizarTemplate() {
    lista_clientes.innerHTML = '';
    clientes.forEach((cliente) => {
        lista_clientes.innerHTML += templateCliente(cliente);
    });

    const excluirButtons = document.querySelectorAll('.excluir_cliente');
    excluirButtons.forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            excluirCliente(id);
        });
    });

    const editarButtons = document.querySelectorAll('.editar_cliente');
    editarButtons.forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            editarCliente(id);
        });
    });
}

function salvarCliente(formulario) {
    let id = clientes.length;
    clientes.push(new Cliente(formulario, id));
    formulario.opcao.innerText= 'Salvar'
    return clientes;
}

function excluirCliente(id) {
    if (window.confirm('Deseja mesmo excluir esse cliente?')) {
        clientes.splice(id, 1);
        atualizarTemplate();
    }
}

function editarCliente(id){
    const edCliente = clientes[id]
    
    mostrarFormulario()
    formulario.nome.value = edCliente.nome
    formulario.email.value = edCliente.email
    formulario.celular.value = edCliente.celular
    formulario.cidade.value = edCliente.cidade
    formulario.opcao.innerText= 'Editar'
    tempId = Number(id)
}

window.onload = () => {
    atualizarTemplate();
}

function mostrarFormulario(){
    if (divFormulario.style.display === 'none') {
        formulario.reset();
        divFormulario.style.display = 'block';
    } else {
        divFormulario.style.display = 'none';
        formulario.reset();
    }
}

botaoFormulario.onclick = () => {
    mostrarFormulario();
}

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const opcao = e.target.opcao.innerText

    if(opcao === 'Editar'){
        clientes.splice(tempId, 1);        
    }
    salvarCliente(formulario);
    atualizarTemplate();
    mostrarFormulario();
        
});
