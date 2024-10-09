const URL_API = "http://localhost:3000/carros";
const headers={
    'Content-type': 'application/json; charset=UTF-8'
};

function mensagemErro(erro){
    alert(`Verifique se o servidor está online! Erro: ${erro.message}`)
}

async function criarCarro(carro) {
    try{
        await fetch(URL_API, {
            method: 'POST',
            body: JSON.stringify(carro),
            headers: headers
        })
    } catch(erro){
        mensagemErro(erro)
    }
}

async function buscarCarros() {
    try{
        const carros = await fetch(URL_API)
        return await carros.json()
    } catch(erro){
        mensagemErro(erro)
    }
}
async function buscarCarro(id) {
    try{
        const carro = await fetch(`${URL_API}/${id}`)
        return await carro.json()
    } catch(erro){
        mensagemErro(erro)
    }
}

async function excluirCarro(id) {
    try{
        await fetch(`${URL_API}/${id}`, { method:'DELETE' })
    } catch(erro){
        mensagemErro(erro)
    }
}

async function editarCarro(carroEditado, id) {
    try{
        await fetch(`${URL_API}/${id}`, { 
            method:'PUT',
            body: JSON.stringify(carroEditado),
            headers:headers

        })
    } catch(erro){
        mensagemErro(erro)
    }
}

export const carrosService = {
    criarCarro,
    buscarCarros,
    buscarCarro,
    excluirCarro,
    editarCarro
}