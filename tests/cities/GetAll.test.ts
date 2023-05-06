import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Recovery of all cities', () => {


  it('Get all cities', async () => {

    const res1 = await testServer
      .post('/cities')
      .send({ name: 'Maputo' });


    expect(res1.statusCode).toEqual(StatusCodes.CREATED);


    const res2 = await testServer
      .post('/cities')
      .send({ name: 'Matola' });


    expect(res2.statusCode).toEqual(StatusCodes.CREATED);



    const res3 = await testServer
      .get('/cities')
      .send();


    expect(Number(res3.headers['x-total-count'])).toBeGreaterThan(0);
    expect(res3.statusCode).toEqual(StatusCodes.OK);
    expect(res3.body.length).toBeGreaterThan(0);

  });


  it('Get cities with valid query params', async () => {

    const res1 = await testServer
      .get('/cities?page=1&limit=8&filter=Robert');


    expect(res1.statusCode).toEqual(StatusCodes.OK);

  });


  it('Get cities with invalid query params/param', async () => {


    const res1 = await testServer
      .get('/cities?page=0&limit=1&filter=Robert');



    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.query.page');


    const res2 = await testServer
      .get('/cities?page=1&limit=0&filter=Robert');


    expect(res2.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res2.body).toHaveProperty('errors.query.limit');

  });

});