const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculator__keys')
const display = document.querySelector('.calculator__display')

const calculate = (n1, operator, n2) => {
    const firstNum = parseFloat(n1)
    const secondNum = parseFloat(n2)
    if (operator === 'add') {return firstNum + secondNum}
    if (operator === 'subtract') {return firstNum - secondNum}
    if (operator === 'multiply') {return firstNum * secondNum}
    if (operator === 'divide') {return firstNum / secondNum}
    
  }

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        // guarda qual button foi clicado
        const key = e.target

        // guarda se tem ou nao um algo no atributo data-action
        // nesse caso apenas quando for um numero false e quando for outro tecla true
        const action = key.dataset.action

        // guarda o valor da tecla clicada
        const keyContent = key.textContent
        // guarda o valor que esta no display
        let displayedNum = display.textContent

        // pega uma coleçao dos filhos que tem dentro do elemento pai da tecla clicada
        // converter para um array
        // itera sobre cada elemento para remover a class is-depressed, e garantir que visualmente nenhuma esteja pressionada
        Array.from(key.parentNode.children)
            .forEach(k => k.classList.remove('is-depressed'))
        
        // guarda o valor da ultima tecla clicada no atributo personalizado, o valor é criado quando clicado em um operador
        const previousKeyType = calculator.dataset.previousKeyType

        // verifica se é um numero
        if(!action){
            // verifica se esta apenas o zero no display, como zero a esquerda nao vale nada, ele substitui pelo valor do numero clicado
            // tambem pode ser que a ultima tecla tenha sido um operador, entao substitui assim como quando o display é zero
            // se nao passar apenas concatena o novo numero do botao clicado no display
            if (displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate') {
                display.textContent = keyContent
            } else {
                display.textContent = displayedNum + keyContent
            }

            // guardar a tecla que foi apertada
            calculator.dataset.previousKeyType = 'number'
        }

        // verifica se é algum operador +,-,/,*
        if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
        ){
            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayedNum

            console.log(firstValue)
            console.log(operator)
            console.log(secondValue)


            // Ver se ja existe um primeiro valor e existe um operador
            // isso significa que algo clicar, numero -> operador -> numero -> operador, mesmo sem ser o igual clicado ele realiza a operação
            // verificando tambem se ele nao esta clicando no operador varias vezes
            // guardando o resultado no firstValue para realizar os calculos consecutivos
            // verifica tambem se a ultima tecla clicada foi o igual
            if (firstValue && operator && previousKeyType !== 'operador' && previousKeyType !== 'calculate') {
                if(secondValue === '0' && operator === 'divide'){
                    window.location.reload()
                }
                const calcValue = calculate(firstValue, operator, secondValue)
                
                
                //atualizar display
                display.textContent = calcValue
                // guardar o resultado no primeiro valor
                calculator.dataset.firstValue = calcValue
            } 
            // caso não esteja no ponto do calculo ele apenas define o primeiro valor igual o display, seria a situação normal
            else {
                calculator.dataset.firstValue = displayedNum
            }

            // adiciona a classe is-depressed para deixar o botao como se estivesse pressionado
            key.classList.add('is-depressed')

            // guarda os primeiro valor e a operação para realizar o calculo depois
            calculator.dataset.operator = action

            // guarda o operador para saber que a ultima tecla foi um operador
            // para isso, usa um atributo personalizado igual usado no data-action
            calculator.dataset.previousKeyType = 'operator'
        }

        // verifica se clicou sobre o ponto para virar decimal
        if (action === 'decimal') {
            // verifica se o numero ainda não é um decimal
            if (!displayedNum.includes('.')) {
                display.textContent = displayedNum + '.'
            }
            // verifica se a ultima tecla foi um operador para poder atribuir o '0.'
            else if (previousKeyType === 'operator' || previousKeyType === 'calculate') {
                display.textContent = '0.'
            }

            // guardar a tecla que foi apertada
            calculator.dataset.previousKeyType = 'decimal'
        }

        // vertifica se a tecla AC ou CE foi clicada
        if (action === 'clear') {
            if (key.textContent === 'AC') {
                calculator.dataset.firstValue = ''
                calculator.dataset.modValue = ''
                calculator.dataset.operator = ''
                calculator.dataset.previousKeyType = ''
                display.textContent = '0'
            } else {
                displayedNum = displayedNum.slice(0,-1)
                if(displayedNum === '' || previousKeyType === 'calculate'){
                    key.textContent = 'AC'
                    display.textContent = '0'
                }else{
                    display.textContent = displayedNum
                }
                
            }
            
            calculator.dataset.previousKeyType = 'clear'
            
        }
        // verificar se algo ja foi clicado e altera para CE
        if(action !== 'clear'){
            const clearButton = calculator.querySelector('[data-action=clear]')
            clearButton.textContent = 'CE'

        }

        // verifica se o igual foi clicado
        if (action === 'calculate') {
            // recupera os valores necessarios para realizar o calculo
            let firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayedNum
            
            // realizar o calculo e exibir no display se ja tivermos um primeiro numero, significa que ja temos um operador
            if(firstValue){
                // verifica se a ultima tecla foi o igual e troca o primeiro valor pelo resultado que ja esta na tela
                // assim sobrescreveendo o segundo numero para o segundo que realizou que realizou a operacao anterior, podendo entao realizar varias vezes clicando no igual
                if(previousKeyType === 'calculate'){
                    firstValue = displayedNum
                    secondValue = calculator.dataset.modValue
                }
                display.textContent = calculate(firstValue, operator, secondValue)
            }

            // guardar o segundo valor para se ele clicar novamente no igual
            calculator.dataset.modValue = secondValue
            // guardar a tecla que foi apertada
            calculator.dataset.previousKeyType = 'calculate'
        }
    }
})