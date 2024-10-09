const formulario = document.forms.namedItem('teclas')
const tela = document.getElementById('tela')
const btnLimpar = document.getElementById('limpar')
const historico = document.getElementById('historico')

let numeros = []
let operacao = ''
let numero = '0'
let resultado = 0


function resetar(num_tela){
    numeros = []
    operacao = ''
    numero = num_tela
}

function atualizarTela(novoNumero){
    tela.innerText = novoNumero.replace('.',',')

    if(numero === '0'){
        btnLimpar.value = 'AC'
        btnLimpar.innerText = 'AC'
        return
    }
    btnLimpar.value = 'CE'
    btnLimpar.innerText = 'CE'
}

function apagarUltimo(){
    numero = numero.slice(0,numero.length - 1)
    if(numero.length === 0){
        numero = '0'
    }
}

function trocarOperacao(novoOperador){
    // Alterar operação quando nao digitou nada
    if(numero === '0'){
        operacao = novoOperador
        
        numero = '0'
        numeros.push(parseFloat(numero))
        atualizarTela(numero)
        return
    }

    // Alterar quando ja tem um numero
    operacao = novoOperador
    numeros.push(parseFloat(numero))
    numero = '0'
    atualizarTela(numero)
    return
}

function adicionarNumero(novoNumero){
    if(numero === '0'){
        numero = novoNumero
        atualizarTela(numero)
        return
    }
    if(numero === '-0'){
        numero = '-' + novoNumero
        atualizarTela(numero)
        return
    }
    numero += novoNumero
    atualizarTela(numero)
    return
}

// Operações
function somar(n1,n2){
    return (n1 + n2).toFixed(3)
}
function subtrair(n1,n2){
    return (n1 - n2).toFixed(3)
}
function dividir(n1,n2){
    if(n2 === 0){
        alert('Erro: divisão por zero')
        resetar('0')
        return
    }
    return (n1 / n2).toFixed(3)
}
function multiplicar(n1,n2){
    return (n1 * n2).toFixed(3)
}

// Realizar calculo
function calcular(){
    switch (operacao) {
        case '+':
            resultado = somar(numeros[0], numeros[1])
            break;
        case '-':
            resultado = subtrair(numeros[0], numeros[1])
            break;
        case '/':
            resultado = dividir(numeros[0], numeros[1])
            break;
        case '*':
            resultado = multiplicar(numeros[0], numeros[1])
            break;
    }
    return resultado
}

// Display conta no historico
function displayConta(){
    return `
        <tr>
            <td>${numeros[0]}</td>
            <td>${operacao}</td>
            <td>${numeros[1]}</td>
            <td>${resultado.toString().replace('.',',')}</td>
        </tr>
    `
}

// Adicionar no historico
function adicionarNoHistorico(){
    historico.innerHTML += displayConta()
}

// Mostrar resultado
function mostrarResultado(){
    console.log
    resultado = calcular()

    // Exibir o resultado, e resetar para proximas operações guardando o resultado
    numero = resultado.toString()
    atualizarTela(numero)
    adicionarNoHistorico()
    resetar(numero)
    return
}

// Clique em alguma tecla
formulario.addEventListener('submit', (e) => {
    e.preventDefault()

    let teclaApertada = e.submitter.value

    // AC
    if(teclaApertada === 'AC'){
        resetar('0')
        return
    }

    // CE
    if(teclaApertada === 'CE' && numero.length > 0){
        apagarUltimo()
        atualizarTela(numero)
        return
    }

    // Virgula
    if(teclaApertada === ','){
        // Ver se ja tem uma virgula(ponto no caso)
        if (numero.includes('.')){
            return 
        }
        // Adicionar virgula caso nao tenha
        numero += '.'
        atualizarTela(numero)
        return
    }
    
    // Alguma operação clicada
    if(isNaN(parseFloat(teclaApertada))){
        // Se a operação for igual
        if(teclaApertada === '='){
            if(numeros.length < 1 || operacao === ''){
                return
            }
            // Adicionar o numero atual
            numeros.push(parseFloat(numero))
            mostrarResultado()
            return
        }
        // Quando for inserir numero negativo
        if(numero === '0' && teclaApertada === '-'){
            numero = '-0'
            atualizarTela(numero)
            return
        }
        // Se for algum outro operador
        trocarOperacao(teclaApertada)
        return
    }

    // Adicionar o novo numero clicado
    adicionarNumero(teclaApertada)
    return
})