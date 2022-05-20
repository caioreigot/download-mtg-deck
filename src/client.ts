import getCardNames from './getCardNames';
import getCardsObject from './getCardsObject';
import getCardsImage from './getCardsImage';
import { ErrorMessages } from './commons/enums/errorMessages';
import { HttpStatusCode } from './commons/enums/httpStatusCode';

/* 
  Fluxo do código:
  Pega todos os nomes das cartas dentro do deck importado (txt)
  Pega o objeto dessas cartas através da API, usando os seus nomes
  Baixa a imagem das cartas, caso não exista
*/
  
getCardNames(`${__dirname}/deck_test.txt`)
  .then(getCardsObject)
  .then(getCardsImage)
  .catch(err => {
    if (err?.response?.status === HttpStatusCode.NOT_FOUND) {
      // Se o código passou neste if, há um nome inválido no arquivo do deck
      // Obs: importante mostrar o err.response.data.details pro usuário
      console.warn(`${ErrorMessages.ERR6} Mensagem do erro: ${err}`);
      console.warn(`Detalhes do erro na API: ${err.response.data.details}`);
      
      return;
    }
    
    console.warn(`${ErrorMessages.ERR6} Mensagem do erro: ${err}`);
  });

export function receiveDownloadProgress(progress: number) {
  const progressInPercentage = `${(progress * 100).toFixed(0)}%`;
  
  let percentage: number = parseInt((progress * 100).toFixed(0));
  let oneQuarter: number = percentage / 4;
  let uiLoading: string = '[.........................]';
  
  for (let i = 0; i < oneQuarter; i++) {
    uiLoading = uiLoading.replace('.', '#');
  }

  console.clear();

  if (percentage !== 100) {
    console.log(`[${progressInPercentage}] Baixando imagens...`);
    console.log(uiLoading);
  } else {
    console.log('Imagens baixadas com sucesso!');
  }
}
