function Preencher(url, campo, ativa, idN) {
    const select = campo;

    fetch(url)
    .then( res => res.json() )
    .then( stados => {
        for (let i of stados){
            const value = idN ? i.id : i.nome;
            select.innerHTML += `<option value="${value}"> ${i.nome} </option>`;
        }
    });

    if (ativa) select.disabled = false;
}

function Populate() {
    const select = document.querySelector("select[name=Estado]");
    const url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";

    Preencher(url, select, null, true);
}

function getCidades(event){
    const campoCidade = document.querySelector("select[name=Cidade]");
    const Estado = document.querySelector("input[name=state]");

    const valor = event.target.value;
    const index = event.target.selectedIndex;
    Estado.value = event.target.options[index].text;

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${valor}/municipios`;

    campoCidade.innerHTML = "<option value> Selecione a cidade </option>";

    Preencher(url, campoCidade, true, false);
}

Populate();

document.querySelector("select[name='Estado']").addEventListener("change", getCidades);

//itens de coleta

function selectItem(event) {
    const itemSelect = event.target.dataset.id;
    const itemLi = event.target;

    itemLi.classList.toggle("selected");

    const jaSelect = itensSelecionados.findIndex(function(iten){
        const itemFound = iten == itemSelect;
        return itemFound;
    });

    if (jaSelect >= 0) {
        const filterItems = itensSelecionados.filter(iten => {
            const itemIsDifenrent = iten != itemSelect;
            return itemIsDifenrent;
        });

        itensSelecionados = filterItems;
    } else {
        itensSelecionados.push(itemSelect);
    }

    compoIn.value = itensSelecionados;
}

const itensColeta = document.querySelectorAll("#item-grid li");
let itensSelecionados = [];
const compoIn = document.querySelector('input[name=itensList]');

for (let iten of itensColeta) {
    iten.addEventListener("click", selectItem);
}