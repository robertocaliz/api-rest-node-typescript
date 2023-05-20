import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('City - Get All', () => {

  let accessToken: string;

  const accessTokenPatter = /^.{1,}\..{1,}\..{1,}$/;

  beforeAll(async () => {

    const res = await testServer
      .post('/sign-in')
      .send({
        email: 'robertotests@gmail.com',
        password: 'testes1999'
      });

    expect(res.statusCode).toEqual(StatusCodes.OK);
    expect(accessTokenPatter.test(res.body)).toEqual(true);
    accessToken = res.body;

  });


  beforeAll(async () => {

    const res3 = await testServer
      .post('/cities')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ name: 'Maputo' });


    expect(res3.statusCode).toEqual(StatusCodes.CREATED);
    expect(res3.body as number).toBeGreaterThan(0);


    const res4 = await testServer
      .post('/cities')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ name: 'Matola' });


    expect(res4.statusCode).toEqual(StatusCodes.CREATED);
    expect(res4.body as number).toBeGreaterThan(0);

  });


  it('Get cities of first page', async () => {

    const res = await testServer
      .get('/cities')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();


    expect(res.statusCode).toEqual(StatusCodes.OK);
    expect(res.body.length).toBeGreaterThanOrEqual(2);
    expect(Number(res.headers['x-total-count'])).toBeGreaterThan(0);


  });


  it('Do not get cities of invalid page', async () => {

    const res1 = await testServer
      .get('/cities?page=0')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.query.page');



    const res2 = await testServer
      .get('/cities?page=-1')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res2.body).toHaveProperty('errors.query.page');


  });


  it('Get cities where name like %Ma%', async () => {

    const res = await testServer
      .get('/cities?filter=Ma')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(res.statusCode).toEqual(StatusCodes.OK);
    expect(res.body.length).toBeGreaterThanOrEqual(2);
    expect(Number(res.header['x-total-count'])).toBeGreaterThan(0);

  });


});