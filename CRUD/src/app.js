import { carrosService } from "./service/carros-service.js";
import { Carro } from "./utils/Carro.js";

const formularioCadastro = document.forms.namedItem('cadastro');

formularioCadastro.addEventListener('submit', (evento) =>{
    evento.preventDefault();

    const carro = new Carro(formularioCadastro);
    carrosService.criarCarro(carro)
})