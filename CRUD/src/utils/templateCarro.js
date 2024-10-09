import { carrosService } from "../service/carros-service.js"

export function templateCarro(carro){
    return `
        <div class="carro">
            <h2>${carro.marca} ${carro.modelo} ${carro.ano}</h2>
            <img
                width="400"
                src="${carro.foto}"
                alt="${carro.marca} ${carro.modelo}"
            >
            <div>
                <p>Quilometros rodados: ${carro.quilometragem}</p>
                <p>Valor ${carro.preco}</p>
            </div>
            <div>
                <button onclick="editarCarro('${carro.id}')">Editar</button>
                <button onclick="excluirCarro('${carro.id}')">Excluir</button>
            </div>
        </div>
    `
};

window.editarCarro = (id) => {
    window.location.href = `editar.html?id=${id}`
};

window.excluirCarro = (id) => {
    if (window.confirm('Deseja mesmo excluir esse carro')){
        carrosService.excluirCarro(id);
    } 
};