import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('getting all persons', () => {

  it('get all persons', async () => {


    const res1 = await testServer
      .post('/persons')
      .send({
        fullName: 'Roberto Caliz',
        email: 'robertocaliz72@gmail.com',
        cityId: 7
      });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(res1.body).toBeGreaterThan(0);


    const res2 = await testServer
      .post('/persons')
      .send({
        fullName: 'Marco Caliz',
        email: 'marcocaliz72@gmail.com',
        cityId: 1
      });


    expect(res2.statusCode).toEqual(StatusCodes.CREATED);
    expect(res2.body).toBeGreaterThan(0);


    const res3 = await testServer
      .get('/persons')
      .send();


    expect(res3.statusCode).toEqual(StatusCodes.OK);
    expect([...res3.body].length).toBeGreaterThanOrEqual(2);
    expect(Number(res3.header['x-total-count'])).toBeGreaterThan(0);


  });

});