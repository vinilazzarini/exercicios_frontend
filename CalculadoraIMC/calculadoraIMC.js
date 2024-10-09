const formulario = document.forms.namedItem('calculadora')
const resultado = document.getElementById('resultado')

function templateResutaldo(imc, classificacao){
    return `
        <p>O IMC é ${imc} e a classificação é: ${classificacao}</p>
    `
}

function calculoIMC(altura, peso){
    return peso / (altura * altura)
}

function verClassificacao(imc){
    if (imc <= 16.9){
        return 'Muito abaixo do peso'
    }
    if (imc <= 18.4){
        return 'Abaixo do peso'
    }
    if (imc <= 24.9){
        return 'Peso Normal'
    }
    if (imc <= 29.9){
        return 'Acima do peso'
    }
    if (imc <= 34.9){
        return 'Obesidade grau I'
    }
    if (imc <= 40){
        return 'Obesidade grau II'
    }
    return 'Obesidade grau III'
}

formulario.addEventListener('submit', (e) => {
    e.preventDefault()

    let altura = formulario.altura.value.replace(',','.')
    let peso = formulario.peso.value.replace(',','.')

    altura = parseFloat(altura)
    peso = parseFloat(peso)

    
    if (isNaN(altura) || isNaN(peso)){
        alert('Insira apenas numeros')
        formulario.reset()
        formulario.altura.focus()
        return
    }

    let imc = calculoIMC(altura,peso).toFixed(2)
    const classificacao = verClassificacao(imc)

    resultado.innerHTML = templateResutaldo(imc.replace('.', ',') ,classificacao)
})
