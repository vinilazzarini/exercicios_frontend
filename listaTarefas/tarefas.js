const formulario = document.forms.namedItem("novaTarefa");
const listaDeTarefas = document.querySelector("ul");

const tarefas = [];

function cadastrarTarefa(tarefa){
    tarefas.push(tarefa);
}

function atualizarItensLista(){
    listaDeTarefas.innerHTML = '';
    tarefas.forEach((tarefa,indexTarefa) => {
        listaDeTarefas.innerHTML += templateItemLista(tarefa,indexTarefa);
    })
}

function excluirTarefa(indexTarefa){
    if(window.confirm('Deseja excluir essa tarefa?')){
        tarefas.splice(indexTarefa,1);
        atualizarItensLista();
    }
}

function templateItemLista(tarefa,indexTarefa){
    return `
        <li>
            <span>${tarefa}</span>
            <button
                onclick="excluirTarefa(${indexTarefa})">
                Excluir
            </button>
        </li>
    `;
}

function limparFormularioFocarInput(){
    formulario.reset();
    formulario.tarefa.focus();
}

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const { tarefa } = formulario;

    cadastrarTarefa(tarefa.value);
    atualizarItensLista();
    limparFormularioFocarInput();
})