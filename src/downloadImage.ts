import * as fs from 'fs';
import axios from 'axios';
import { ErrorMessages } from './commons/enums/errorMessages';
import { ImageExtensions } from './commons/enums/imageExtensions';

export default async function downloadImage(
  pathToDownload: string,
  imageExtension: ImageExtensions,
  imageUrl: string,
  nameToSave: string
): Promise<void> {
  // Cria a pasta especificada caso ela não exista
  if (!fs.existsSync(pathToDownload)) {
    fs.mkdirSync(pathToDownload, { recursive: true });
  }

  const file: string = `${pathToDownload}/${nameToSave}${imageExtension}`;

  /* Se a imagem da carta já está baixada, retorna uma
  promise resolvda */
  if (fs.existsSync(file)) {
    return new Promise(resolve => resolve());
  }

  const writer: fs.WriteStream = fs.createWriteStream(file);
  
  axios.request({
    url: imageUrl,
    method: 'GET',
    responseType: 'stream',
    headers: { 'Content-Encoding': 'gzip' }
  })
    .then(response => response.data.pipe(writer))
    .catch(e => { 
      throw new Error(
        `${ErrorMessages.ERR1} Mensagem do erro: ${e.message}`
      ); 
    });

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}