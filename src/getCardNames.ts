/* Pegando o nome das cartas de um deck importado

Modelo de deck importado (texto):
1 Boseiju, Who Endures
1 Treasure Vault
1 Path of Ancestry
...

O que a função devolve:
[Boseiju Who Endures, Treasure Vault, Path of Ancestry, ...]
*/

import * as fs from 'fs';
import { ErrorMessages } from './commons/enums/errorMessages';

export default async function getCardNames(
  pathToFile: string
): Promise<string[]> {
  if (!fs.existsSync(pathToFile)) {
    throw new Error('O arquivo do deck importado não existe.');
  }

  try {
    const content = await fs.readFileSync(pathToFile, 'utf-8');
    return content.replace(/^[0-9]+\s+/gm, '').split('\n')
  } catch(err) {
    throw new Error(
      `${ErrorMessages.ERR2} Erro: ${err}`
    );
  }
}