import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('City Update', () => {



  it('Update city with valid name and id ', async () => {


    const res1 = await testServer
      .post('/cities')
      .send({ name: 'Inhambane' });


    expect(res1.statusCode).toEqual(StatusCodes.CREATED);


    const res2 = await testServer
      .put(`/cities/${res1.body}`)
      .send({ name: 'Maputo' });


    expect(res2.statusCode).toEqual(StatusCodes.NO_CONTENT);


  });



  it('Update city by id that does not exist', async () => {


    const res1 = await testServer
      .put('/cities/9999')
      .send({ name: 'Tete' });

      

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');


  });



  it('Do not update city with invalid name and/or id', async () => {


    const res1 = await testServer
      .put('/cities/0')
      .send({ name: 'Maputo' });


    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.params.id');

    const res2 = await testServer
      .put('/cities/1')
      .send({ name: 'Ma' });


    expect(res2.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res2.body).toHaveProperty('errors.body.name');



    const res3 = await testServer
      .put('/cities/E')
      .send({ name: 'Maputo' });


    expect(res3.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res3.body).toHaveProperty('errors.params.id');


  });


});