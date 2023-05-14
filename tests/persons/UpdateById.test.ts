import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('person update', () => {

  it('update person', async () => {

    const rest1 = await testServer.post('/persons')
      .send({
        fullName: 'Roberto Caliz',
        email: 'robertocaliz72@gmail.com',
        cityId: 5
      });

    expect(rest1.statusCode).toEqual(StatusCodes.CREATED);
    expect(Number(rest1.body)).toBeGreaterThan(0);


    const res2 = await testServer.put(`/persons/${rest1.body}`)
      .send({
        fullName: 'Roberto Caliz',
        email: 'robertocaliz72@gmail.com',
        cityId: 1
      });


    expect(res2.status).toEqual(StatusCodes.NO_CONTENT);
    expect(res2.body).toEqual({});

  });



  it('Do not update person with invalid attributes', async () => {

    const res = await testServer.put('/persons/0')
      .send({
        fullName: 'Roberto',
        email: 'InvalidEmail',
        cityId: 0
      });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors.params.id');
    expect(res.body).toHaveProperty('errors.body.fullName');
    expect(res.body).toHaveProperty('errors.body.email');
    expect(res.body).toHaveProperty('errors.body.cityId');


  });



  it('Do not update person who does not exist', async () => {

    const res = await testServer
      .put('/persons/9999')
      .send({
        fullName: 'Roberto Caliz',
        email: 'robertocaliz72@gmail.com',
        cityId: 1
      });

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty('errors.default');

  });


});