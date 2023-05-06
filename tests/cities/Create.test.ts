import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';




describe('City Creation', () => {


  it('Create valid city', async () => {

    const res1 = await testServer.post('/cities')
      .send({
        name: 'Maputo'
      });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

  });




  it('Do not create invalid city', async () => {

    const res1 = await testServer
      .post('/cities')
      .send({ name: 'Ma' });
    

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.name');


    const res2 = await testServer
      .post('/cities')
      .send({ name: '1' });


    expect(res2.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res2.body).toHaveProperty('errors.body.name');

  });


});