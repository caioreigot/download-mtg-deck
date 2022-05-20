"use strict";
/* Pegando o nome das cartas de um deck importado

Modelo de deck importado (texto):
1 Boseiju, Who Endures
1 Treasure Vault
1 Path of Ancestry
...

O que a função devolve:
[Boseiju Who Endures, Treasure Vault, Path of Ancestry, ...]
*/
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const errorMessages_1 = require("./commons/enums/errorMessages");
async function getCardNames(pathToFile) {
    if (!fs.existsSync(pathToFile)) {
        throw new Error('O arquivo do deck importado não existe.');
    }
    try {
        const content = await fs.readFileSync(pathToFile, 'utf-8');
        return content.replace(/^[0-9]+\s+/gm, '').split('\n');
    }
    catch (err) {
        throw new Error(`${errorMessages_1.ErrorMessages.ERR2} Erro: ${err}`);
    }
}
exports.default = getCardNames;
