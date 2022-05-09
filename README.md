# Download MTG Deck
## API usada: <a href="https://scryfall.com/docs/api">Scryfall</a>
### O que o código faz?
O funcionamento se resume em 3 funções:
* <strong>getCardNames</strong>: Recebe de parâmetro o caminho absoluto de um arquivo .txt. Ele lerá este arquivo de texto e extrairá os nomes das cartas escritos nele (é necessário ter apenas um nome por linha). Obs: eles podem conter uma numeração antes de cada nome indicando quantas cartas daquela há no deck, o código irá lidar com isso (há um <strong>deck_test.txt</strong> no repositório que serve de modelo). Por fim, a função retorna um array de strings, que correspondem ao nome de cada carta extraída do arquivo.

* <strong>getCardsObject</strong>: Recebe de parâmetro o retorno da função citada acima, ou seja, um array de strings. A função irá percorrer este array e para cada string (cada nome de carta) irá fazer uma requisição GET à API (citada no começo deste README), que irá responder com um objeto, contendo informações sobre esta carta, como por exemplo, seu nome, sua URL para download de imagens, seu custo de mana, entre muitos outros. A função irá retornar um array de objetos ICard (/src/commons/interfaces/ICard.ts).

* <strong>getCardsImage</strong>: Recebe de parâmetro o retorno da função citada acima, ou seja, um array de ICard. A função irá percorrer este array e para cada objeto ICard, ela irá acessar a URL para download contida no objeto da carta e irá baixar a imagem usando a função "downloadImage" (/src/downloadImage.ts). Para cada imagem do deck baixada, o client é notificado, gerando assim, o progresso de download em porcentagem. As imagens serão baixadas na pasta especificada no arquivo "config.ts" (/src/config.ts). Obs: não será baixado novamente as cartas que já estiverem presentes na pasta de imagens.

Por fim, o arquivo <strong>client.ts</strong> presente na pasta /src simula o uso prático do código. É usado as 3 funções que citei acima, em uma cadeira de promises, onde a próxima função só é chamada quando a anterior for bem sucedida: 

<p align="center">
  <img src="https://user-images.githubusercontent.com/62410044/167485873-c1bed1d0-0b36-4c46-8011-c6c865fc5ce3.png">
</p>
