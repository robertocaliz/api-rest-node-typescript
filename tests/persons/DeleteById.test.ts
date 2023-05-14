import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('person deletion', () => {

  it('delete person', async () => {

    const res1 = await testServer
      .post('/persons')
      .send({
        fullName: 'Roberto Caliz',
        email: 'robertocaliz72@gmail.com',
        cityId: 5
      });


    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(Number(res1.body)).toBeGreaterThan(0);


    const res2 = await testServer
      .delete(`/persons/${res1.body}`)
      .send();

    expect(res2.statusCode).toEqual(StatusCodes.NO_CONTENT);
    expect(res2.body).toEqual({});


  });



  it('Do not delete person with using invalid Id', async () => {

    const res = await testServer
      .delete('/persons/0')
      .send();

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors.params.id');

  });


  it('Do not delete person who does not exist', async () => {

    const res = await testServer.
      delete('/persons/9999')
      .send();


    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty('errors.default');

  });

});