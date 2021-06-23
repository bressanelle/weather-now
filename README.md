## Weather Now

Este é um projeto front-end desenvolvido implementando uma biblioteca de web-componentes gerada com stêncil que visa facilitar a utilização de micro-frontends.

O intuito é exibir as condições climáticas de três cidades.

- Nuuk - GL
- Urubici - BR
- Nairobi - KE

Se você ficou curioso saiba que a biblioteca foi feita exclusivamente para este projeto (e em apenas um final de semana) e ela está disponível [aqui](https://github.com/deprecat3d/weather-now-component-library)

## Características do projeto

Em conjunto com sua component-library, uma vez que um complementa o outro, temos os seguintes pontos:

- Temperatura exibida em graus Celsius ✔
- Umidade exibida em percentual ✔
- Pressão exibida em hectoPascal ✔
- Temperaturas igual ou abaixo de 5 graus devem exibidas em azul ✔
- Temperaturas acima de 5 graus e igual ou abaixo de 25 exibidas em laranja ✔
- Temperaturas acima de 25 graus exibidas em vermelho ✔
- As condições climáticas são atualizadas a cada 10 minutos ✔
- As condições climáticas são cacheadas no front-end por 10 minutos (com cobertura de testes no service) ✔
- Boas práticas de desenvolvimento ✔
- Arquitetura baseada em componentes (com pacote npm próprio) ✔
- Sem frameworks CSS ✔
- Utilização de Scss e CSS puro ✔

## Falar é fácil, me mostre o código...

Após clonar o repositório, va até a raiz do projeto onde está o package.json e rode

```bash
  npm install --save
```

Então fique a vontade para explorar as possibilidades.

Pode rodar os testes com

```bash
  npm test
```

E o projeto, propriamente dito

```bash
  npm start
```

Tenho quase certeza que ele vai levantar na porta 4200, mas fique atento aos logs de compilação. Se você rodar em paralelo [a biblioteca de componentes](https://github.com/deprecat3d/weather-now-component-library) ele vai subir na 3737.

## Poderia ser melhor

A component-library não fornece tipos para que o vscode entenda estaticamente e é preciso alguns esforços para entender os outputs-targets do Stencil.
Daria também para deixar tudo rodando lindamente no Docker.

Algumas decisões de arquitetura de componentes podem ser subjetivadas.
