import { carrosService } from "../service/carros-service.js";
import { templateCarro } from "../utils/templateCarro.js";

const carrosContainer = document.getElementById('carrosContainer');

window.onload = () => {
    carrosService.buscarCarros()
        .then(carros => {
            carros.forEach(carro => {
                carrosContainer.innerHTML += templateCarro(carro)   
            });
        })
}