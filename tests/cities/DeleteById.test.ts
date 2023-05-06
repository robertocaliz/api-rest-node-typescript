import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('City Deletion', () => {



  it('Delete city with valid id', async () => {

    const res1 = await testServer
      .post('/cities')
      .send({ name: 'Maputo' });


    expect(res1.statusCode).toEqual(StatusCodes.CREATED);


    const res2 = await testServer
      .delete(`/cities/${res1.body}`);


    expect(res2.statusCode).toEqual(StatusCodes.NO_CONTENT);

  });



  it('Do not delete city that does not exist', async () => {

    const res1 = await testServer
      .delete('/cities/9999')
      .send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');

  });




  it('Do not delete city with invalid id', async () => {

    const res1 = await testServer
      .delete('/cities/0');


    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.params.id');


    const res2 = await testServer
      .delete('/cities/aaa');


    expect(res2.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res2.body).toHaveProperty('errors.params.id');



    const res3 = await testServer
      .delete('/cities/-1');



    expect(res3.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res3.body).toHaveProperty('errors.params.id');


  });

});