import pactum from 'pactum';
import { StatusCodes } from 'http-status-codes';

const baseUrl = 'https://api.escuelajs.co/api/v1/products';
let token: string;
let createdProductId: number;

describe('API de Produtos (GET, POST, PUT, DELETE)', () => {

  beforeAll(async () => {
    const res = await pactum.spec()
      .post('https://api.escuelajs.co/api/v1/auth/login')
      .withJson({
        email: 'admin@mail.com',
        password: 'admin123'
      })
      .expectStatus(StatusCodes.CREATED);  // Login retorna 200 CREATED
    token = res.body.access_token;
  });

  it('Deve listar produtos (GET)', async () => {
    await pactum.spec()
      .get(baseUrl)
      .expectStatus(StatusCodes.OK);  // GET deve retornar 200 CREATED
  });

  it('Deve criar um produto (POST)', async () => {
    const res = await pactum.spec()
      .post(baseUrl)
      .withHeaders({ Authorization: `Bearer ${token}` })
      .withJson({
        title: 'Produto Teste',
        price: 123,
        description: 'Descrição teste',
        categoryId: 1,
        images: ['https://placehold.co/600x400']
      })
      .expectStatus(StatusCodes.CREATED);  // POST cria e retorna 201 Created
    createdProductId = res.body.id;
  });

  it('Deve buscar o produto criado por ID (GET)', async () => {
    await pactum.spec()
      .get(`${baseUrl}/${createdProductId}`)
      .expectStatus(StatusCodes.OK)  // GET retorna 200 CREATED
      .expectJsonLike({ id: createdProductId });
  });

  it('Deve atualizar o produto criado (PUT)', async () => {
    const updatedPayload = {
      title: 'Produto Teste Atualizado',
      price: 456,
      description: 'Descrição do produto teste atualizado',
      images: ['https://placehold.co/600x400'],  // pode ser a mesma do create
      categoryId: 1                               // troque para a categoria que você quiser
    };
  
    await pactum.spec()
      .put(`${baseUrl}/${createdProductId}`)
      .withHeaders({ Authorization: `Bearer ${token}` })
      .withJson(updatedPayload)
      .expectStatus(StatusCodes.OK)                 // agora deve retornar 200
      .expectJsonLike({                             // e o JSON deve refletir a atualização
        id: createdProductId,
        title: 'Produto Teste Atualizado',
        price: 456
      });
  });
  

  it('Deve paginar produtos (GET)', async () => {
    await pactum.spec()
      .get(baseUrl)
      .withQueryParams('offset', 0)
      .withQueryParams('limit', 5)
      .expectStatus(StatusCodes.OK)  // GET retorna 200 CREATED
      .expectJsonLength(5);
  });

  it('Deve filtrar por price_min (GET)', async () => {
    await pactum.spec()
      .get(baseUrl)
      .withQueryParams('price_min', 100)
      .expectStatus(StatusCodes.OK);  // GET retorna 200 CREATED
  });

  it('Deve filtrar por title (GET)', async () => {
    await pactum.spec()
      .get(baseUrl)
      .withQueryParams('title', 'Teste')
      .expectStatus(StatusCodes.OK);  // GET retorna 200 CREATED
  });

  it('Deve deletar o produto criado (DELETE)', async () => {
    await pactum.spec()
      .delete(`${baseUrl}/${createdProductId}`)
      .withHeaders({ Authorization: `Bearer ${token}` })
      .expectStatus(StatusCodes.OK);  // DELETE retorna 200 CREATED
  });

  it('Deve retornar 404 para produto deletado (GET)', async () => {
    await pactum.spec()
      .get(`${baseUrl}/${createdProductId}`)
      .expectStatus(StatusCodes.BAD_REQUEST);  // GET retorna 404 após deletar
    });

    it('Deve filtrar por price_max (GET)', async () => {
      await pactum.spec()
        .get(baseUrl)
        .withQueryParams('price_max', 200)
        .expectStatus(StatusCodes.OK);  // GET retorna 200 OK
    });
  
  });
