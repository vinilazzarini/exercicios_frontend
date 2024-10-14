async function realizarConsultaCep(cep){
    const url = `https://brasilapi.com.br/api/cep/v2/${cep}`
    try{
        return (await fetch(`${url}`)).json()
    }catch(erro){
        console.log(erro)
    }
}


function preencherCampos(endereco){
    const formulario = document.forms.namedItem('endereco')
    formulario.estado.value = endereco.state
    formulario.cidade.value = endereco.city
    formulario.bairro.value = endereco.neighborhood
    formulario.rua.value = endereco.street
}

const inputCEP = document.getElementById('cep')

inputCEP.addEventListener('change', async () => {
    const cep = await inputCEP.value
    const resposta = realizarConsultaCep(cep)
    preencherCampos(resposta)

})