const formulario = document.forms.namedItem('cadastro');
const tabela = document.querySelector('table')
const corpoTabela = document.querySelector('tbody')
const vazio = document.getElementById('vazio')


const produtos = []

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const {nome, descricao, preco} = formulario;

    const produto = {
        nome: nome.value,
        descricao: descricao.value,
        preco: preco.value
    }

    adicionaProdutoNoArray(produto)
    atualizarLinhasTabela()
    alterarVizualizaçãoTabela()

    formulario.reset()
    nome.focus()
})

function adicionaProdutoNoArray(produto){
    produtos.push(produto)
}

function templateLinhaTabela(produto,indexProduto){
    return `
        <tr>
            <td>${produto.nome}</td>
            <td>${produto.descricao}</td>
            <td>${produto.preco}</td>
            <td>
                <button onclick="excluirProduto(${indexProduto})">
                    Excluir
                </button>
            </td>
        </tr>
    `;
}

function atualizarLinhasTabela(){
    corpoTabela.innerHTML = ''
    produtos.forEach((produto, indexProduto) => {
        corpoTabela.innerHTML += templateLinhaTabela(produto,indexProduto)
    });
}

function esconderTabela(){
    tabela.style.display = 'none'
}
function mostrarTabela(){
    tabela.style.display = 'table'
}
function mostrarVazio(){
    vazio.style.display = 'block'
}
function esconderVazio(){
    vazio.style.display = 'none'
}

function alterarVizualizaçãoTabela(){
    const arrayVazio = produtos.length < 1;

    if (arrayVazio){
        esconderTabela()
        mostrarVazio()
    }else{
        mostrarTabela()
        esconderVazio()   
    }
}

function excluirProduto(indexProduto){
    if(window.confirm('Deseja excluir esse produto?')){
        produtos.splice(indexProduto,1)
        atualizarLinhasTabela()
        alterarVizualizaçãoTabela()
    }
}