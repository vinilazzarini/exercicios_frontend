import { conselho } from "./services/frase-service.js"

const formulario = document.forms.namedItem('conversorTemperatura')
const resultado = document.getElementById('resultado')

const fraseDiv = document.getElementById('frase')

window.onload = async () => {
    const frase = await conselho()
    fraseDiv.innerHTML = `<p>Frase do dia: ${frase}</p>`
}

function converterTemperatura(medI, medF, tempI){
    if(medI == medF){
        return tempI
    }

    // kelvin para
    if(medI == 'Kelvin'){
        // fahreinheit
        if(medF == 'Fahrenheit'){
            return  ((tempI - 273) * 9/5 + 32).toFixed(2)
        }
        // celsius
        if(medF == 'Celsius'){
            return (tempI - 273).toFixed(2)
        }
    }

    // celsius para
    if(medI == 'Celsius'){
        // kelvin
        if (medF == 'Kelvin'){
            return  (tempI + 273).toFixed(2)
        }
        // fahreinheit
        if(medF == 'Fahrenheit'){
            return ((tempI * 9/5) + 32).toFixed(2)

        }
        
    }

    // fahreinheit para
    if(medI == 'Fahrenheit'){
        // celsius
        if(medF == 'Celsius'){
            return ((tempI - 32) * 5/9).toFixed(2)
        }
        // kelvin
        if(medF == 'Kelvin'){
            return ((tempI - 32) * 5 / 9 + 273).toFixed(2)
        }
    }
}

function templateResultado(medidaFinal, temperaturaFinal){
    return `
        <h2> A temperatura em ${medidaFinal} é ${temperaturaFinal}</h2>
    `
}

formulario.addEventListener('submit', (e) => {
    e.preventDefault()

    const { medida_inicial, medida_final, temp} = formulario

    let medidaInicial = medida_inicial.value
    let medidaFinal = medida_final.value
    let temperaturaInicial = parseFloat(temp.value.replace(',','.'))

    if(isNaN(temperaturaInicial)){
        alert('Temperatura tem que ser um numero')
        formulario.reset()
        return
    }

    let temperaturaFinal = converterTemperatura(medidaInicial, medidaFinal, temperaturaInicial)

    temperaturaFinal = temperaturaFinal.toString().replace('.', ',')

    if(medidaFinal === 'Celsius'){
        temperaturaFinal += 'C°'
    }
    if(medidaFinal === 'Fahrenheit'){
        temperaturaFinal += 'F°'
    }

    resultado.innerHTML = templateResultado(medidaFinal,temperaturaFinal)

})
