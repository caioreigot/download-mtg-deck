"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const errorMessages_1 = require("./commons/enums/errorMessages");
/*
  Usa a API do scryfall para pegar os objetos
  das cartas que estão no deck importado.
  
  (pega os nomes das cartas no arquivo .txt e
  faz uma requisição GET para a API retornar
  o objeto da carta e depois de pegar todas,
  retorna o array de ICard)
*/
async function getCardsObject(cardsName) {
    return new Promise((resolve, reject) => {
        const cardObjects = [];
        const apiBase = 'https://api.scryfall.com/cards/named?fuzzy=';
        // Se o array "cardsName" estiver vazio
        if (!cardsName.length) {
            console.warn('Array passado para "getCardsObject" está vazio.');
            resolve([]);
        }
        for (let i = 0; i < cardsName.length; i++) {
            const formattedName = cardsName[i]
                .trimStart()
                .replace(/\s+/g, ' ')
                .replace(/\s+/g, '+');
            /* Coloquei um delay de 100 ms por requisição
            pois o site pede para que coloque, muitas
            requisições à API pode resultar em um
            HTTP 429 Too Many Requests, que pode levar
            a um ban temporario ou permanente do IP */
            setTimeout(async () => {
                await axios_1.default.get(`${apiBase}${formattedName}`)
                    .then(response => {
                    const card = response.data;
                    cardObjects.push(card);
                })
                    .catch(err => {
                    console.warn(`${errorMessages_1.ErrorMessages.ERR5} Mensagem do erro: ${err.message}`);
                    reject(err);
                });
                // Na ultima iteração, resolver a promise
                if (i == cardsName.length - 1) {
                    resolve(cardObjects);
                }
            }, i * 100);
        }
    });
}
exports.default = getCardsObject;
