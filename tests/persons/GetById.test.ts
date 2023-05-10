import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('getting person', () => {

  it('get person by id', async () => {

    const res1 = await testServer.post('/persons')
      .send({
        fullName: 'Roberto Caliz',
        email: 'robertocaliz72@gmail.com',
        cityId: 5
      });


    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(Number(res1.body)).toBeGreaterThan(0);


    const res2 = await testServer.get(`/persons/${res1.body}`)
      .send();

    expect(res2.statusCode).toEqual(StatusCodes.OK);
    expect(res2.body).toHaveProperty('id' && 'fullName');
    expect(res2.body).toHaveProperty('email' && 'cityId');

  });



  it('Do not get person with invalid Id', async () => {

    const res = await testServer.get('/persons/-1')
      .send();

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors.params.id');

  });

});