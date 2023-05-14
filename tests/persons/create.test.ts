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


  it('Do not create persons with the same e-mails', async () => {

    const res1 = await testServer.post('/persons')
      .send({
        fullName: 'Eugenio Felix',
        email: 'eugenio@gmail.com',
        cityId: 2
      });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(res1.body).toBeGreaterThan(0);


    const res2 = await testServer.post('/persons')
      .send({
        fullName: 'Eugenio Andre',
        email: 'eugenio@gmail.com',
        cityId: 2
      });

    expect(res2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res2.body).toHaveProperty('errors.default');

  });



  it('Do not create person with city id who does not exist', async () => {

    const res = await testServer
      .post('/persons')
      .send({
        fullName: 'Roberto Caliz',
        email: 'robertocaliz72@gmail.com',
        cityId: 99999
      });


    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty('errors.default');

  });

});