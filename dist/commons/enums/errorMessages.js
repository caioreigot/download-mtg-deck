"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMessages = void 0;
var ErrorMessages;
(function (ErrorMessages) {
    ErrorMessages["ERR1"] = "Erro em: [downloadImage.ts] -> axios.request().";
    ErrorMessages["ERR2"] = "Erro em: [getCardNames.ts] -> fs.readFile().";
    ErrorMessages["ERR3"] = "Erro em: [client.ts] -> axios.get() -> downloadImage()";
    ErrorMessages["ERR4"] = "Erro em: [client.ts] -> axios.get()";
    ErrorMessages["ERR5"] = "Erro em: [getCardsObject.ts] -> axios.get().";
    ErrorMessages["ERR6"] = "Erro em: [client.ts] -> cadeia de then do getCardNames().";
})(ErrorMessages = exports.ErrorMessages || (exports.ErrorMessages = {}));
