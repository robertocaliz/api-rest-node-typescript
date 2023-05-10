import { describe } from 'node:test';
import { testServer } from '../jest.setup';
import { StatusCodes } from 'http-status-codes';


describe('person creation', () => {

  it('create person', async () => {

    const res = await testServer.post('/persons')
      .send({
        fullName: 'Roberto Caliz',
        email: 'robertocaliz72@gmail.com',
        cityId: 5
      });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);
    expect(Number(res.body)).toBeGreaterThan(0);

  });


  it('Do not create person with invalid attributes', async () => {

    const res = await testServer.post('/persons')
      .send({
        fullName: 'Roberto',
        email: 'InvalidEmail',
        cityId: 0
      });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors.body.fullName');
    expect(res.body).toHaveProperty('errors.body.email');
    expect(res.body).toHaveProperty('errors.body.cityId');

  });

});