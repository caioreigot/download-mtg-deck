"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const axios_1 = require("axios");
const errorMessages_1 = require("./commons/enums/errorMessages");
async function downloadImage(pathToDownload, imageExtension, imageUrl, nameToSave) {
    // Cria a pasta especificada caso ela não exista
    if (!fs.existsSync(pathToDownload)) {
        fs.mkdirSync(pathToDownload, { recursive: true });
    }
    const file = `${pathToDownload}/${nameToSave}${imageExtension}`;
    /* Se a imagem da carta já está baixada, retorna uma
    promise resolvda */
    if (fs.existsSync(file)) {
        return new Promise(resolve => resolve());
    }
    const writer = fs.createWriteStream(file);
    axios_1.default.request({
        url: imageUrl,
        method: 'GET',
        responseType: 'stream',
        headers: { 'Content-Encoding': 'gzip' }
    })
        .then(response => response.data.pipe(writer))
        .catch(e => {
        throw new Error(`${errorMessages_1.ErrorMessages.ERR1} Mensagem do erro: ${e.message}`);
    });
    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
}
exports.default = downloadImage;
