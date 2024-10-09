const botao = document.querySelector('header button')
const menu_mobile = document.getElementById('menu_mobile')

botao.onclick = () => {
    menu_mobile.style.display === 'none' ? 
        menu_mobile.style.display = 'block':
        menu_mobile.style.display = 'none'
}

window.onresize = () => {
    if(window.innerWidth > 600){
        menu_mobile.style.display = 'none'
    }
}