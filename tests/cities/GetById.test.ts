import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('City Reception', () => {


  it('Get city using valid id', async () => {

    const res1 = await testServer
      .post('/cities')
      .send({ name: 'Maputo' });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);


    const res2 = await testServer
      .get(`/cities/${res1.body}`);


    expect(res2.statusCode).toEqual(StatusCodes.OK);
    expect(res2.body).toHaveProperty('name');


  });



  it('Get city using invalid id', async () => {


    const res1 = await testServer
      .get('/cities/E');


    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.params.id');


    const res2 = await testServer
      .get('/cities/0');

    expect(res2.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.params.id');



  });



  it('Get city by id that does not exist', async () => {

    const res1 = await testServer
      .get('/cities/9999')
      .send();


    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');

  });


});