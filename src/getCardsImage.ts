import downloadImage from "./downloadImage";
import ICard from "./commons/interfaces/ICard";
import { CARD_IMAGES_DIR } from "./config";
import { receiveDownloadProgress } from "./client";
import { ImageExtensions } from "./commons/enums/imageExtensions";

export default async function getCardsImage(
  cards: ICard[]
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    let downloadedCards: number = 0;
    const promises: Promise<void>[] = [];

    cards.forEach(card => {
      const promise = downloadImage(
        CARD_IMAGES_DIR,
        ImageExtensions.JPG,
        card.image_uris.normal,
        card.name
      )
      
      /* Quando a promise resolver, incrementar
      o número de cartas baixadas */
      promise.then(() => {
        downloadedCards++;
        const downloadProgress = downloadedCards / cards.length;
        receiveDownloadProgress(downloadProgress);
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