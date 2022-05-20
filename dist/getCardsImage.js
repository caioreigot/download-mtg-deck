"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const downloadImage_1 = require("./downloadImage");
const config_1 = require("./config");
const client_1 = require("./client");
const imageExtensions_1 = require("./commons/enums/imageExtensions");
async function getCardsImage(cards) {
    return new Promise((resolve, reject) => {
        let downloadedCards = 0;
        const promises = [];
        cards.forEach(card => {
            const promise = (0, downloadImage_1.default)(config_1.CARD_IMAGES_DIR, imageExtensions_1.ImageExtensions.JPG, card.image_uris.normal, card.name);
            /* Quando a promise resolver, incrementar
            o número de cartas baixadas */
            promise.then(() => {
                downloadedCards++;
                const downloadProgress = downloadedCards / cards.length;
                (0, client_1.receiveDownloadProgress)(downloadProgress);
            });
            promises.push(promise);
        });
        /* Quando todas as promises forem resolvidas ou rejeitadas
        (ou seja, quando todas as imagens forem baixadas) */
        Promise.all(promises)
            .then(() => resolve(true))
            .catch(() => reject(false));
    });
}
exports.default = getCardsImage;
