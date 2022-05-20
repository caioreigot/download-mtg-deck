"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.receiveDownloadProgress = void 0;
const getCardNames_1 = require("./getCardNames");
const getCardsObject_1 = require("./getCardsObject");
const getCardsImage_1 = require("./getCardsImage");
const errorMessages_1 = require("./commons/enums/errorMessages");
const httpStatusCode_1 = require("./commons/enums/httpStatusCode");
/*
  Fluxo do código:
  Pega todos os nomes das cartas dentro do deck importado (txt)
  Pega o objeto dessas cartas através da API, usando os seus nomes
  Baixa a imagem das cartas, caso não exista
*/
(0, getCardNames_1.default)(`${__dirname}/deck_test.txt`)
    .then(getCardsObject_1.default)
    .then(getCardsImage_1.default)
    .catch(err => {
    var _a;
    if (((_a = err === null || err === void 0 ? void 0 : err.response) === null || _a === void 0 ? void 0 : _a.status) === httpStatusCode_1.HttpStatusCode.NOT_FOUND) {
        // Se o código passou neste if, há um nome inválido no arquivo do deck
        // Obs: importante mostrar o err.response.data.details pro usuário
        console.warn(`${errorMessages_1.ErrorMessages.ERR6} Mensagem do erro: ${err}`);
        console.warn(`Detalhes do erro na API: ${err.response.data.details}`);
        return;
    }
    console.warn(`${errorMessages_1.ErrorMessages.ERR6} Mensagem do erro: ${err}`);
});
function receiveDownloadProgress(progress) {
    const progressInPercentage = `${(progress * 100).toFixed(0)}%`;
    let percentage = parseInt((progress * 100).toFixed(0));
    let oneQuarter = percentage / 4;
    let uiLoading = '[.........................]';
    for (let i = 0; i < oneQuarter; i++) {
        uiLoading = uiLoading.replace('.', '#');
    }
    console.clear();
    if (percentage !== 100) {
        console.log(`[${progressInPercentage}] Baixando imagens...`);
        console.log(uiLoading);
    }
    else {
        console.log('Imagens baixadas com sucesso!');
    }
}
exports.receiveDownloadProgress = receiveDownloadProgress;
