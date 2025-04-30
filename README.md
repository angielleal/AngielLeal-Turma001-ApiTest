Descrição do Projeto
Este projeto realiza testes automatizados de API usando Jest + PactumJS na API pública EscuelaJS Products.

Como executar os testes
bash
Copiar
Editar
npm install
npm run test
Tecnologias usadas
PactumJS

Jest + ts-jest

SonarCloud

GitHub Actions

Como funciona a integração com o SonarCloud
Ao fazer um push para o repositório, a pipeline do GitHub Actions roda os testes automaticamente e envia os dados de cobertura de testes para o SonarCloud. O projeto está vinculado à organização angielleal-1.

Descrição dos Cenários:
Obter a lista de produtos (GET): Verifica se a API retorna a lista de produtos com status 200 OK.

Obter um produto específico (GET): Verifica se é possível acessar um produto específico pelo ID.

Criar um novo produto (POST): Testa a criação de um produto com dados válidos, retornando status 201 Created.

Atualizar um produto existente (PUT): Verifica a atualização de um produto existente, retornando o status 200 OK e os dados atualizados.

Deletar um produto (DELETE): Testa a exclusão de um produto, retornando o status 200 OK.

Criar um produto com dados inválidos (POST): Verifica se a API lida corretamente com dados inválidos, retornando um erro apropriado.

Verificar resposta para produto inexistente (GET): Testa a resposta da API ao tentar acessar um produto inexistente, esperando um erro 404.

Validar o preço do produto (POST/PUT): Verifica se o preço do produto é um número positivo ao criar ou atualizar um produto.

Criar um produto com imagem inválida (POST): Testa a criação de um produto com uma URL de imagem inválida, esperando um erro apropriado.

Validar a quantidade de produtos retornados (GET): Verifica se a lista de produtos contém pelo menos 5 itens, usando paginação.

Filtrar produtos por preço máximo (GET): Testa o filtro de produtos baseado no preço máximo (price_max) retornando produtos que atendem ao critério de filtro.

Scripts no package.json
Adicione o seguinte para que o npm run test:ci funcione como esperado:

json
Copiar
Editar
"scripts": {
  ...
  "test:ci": "jest --config=jest.config.js --runInBand --detectOpenHandles --coverage"
}
✅ 5. Uso correto do PactumJS
Está utilizando spec(), .withJson(), .withQuery(), .expectJsonLike(), etc., conforme a documentação oficial do PactumJS.

Ótimo uso de StatusCodes.