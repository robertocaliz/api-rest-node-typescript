import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';




describe('City - Create', () => {


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


  it('Create city', async () => {

    const res1 = await testServer
      .post('/cities')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        name: 'Maputo'
      });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(res1.body as number).toBeGreaterThan(0);

  });


  it('Do not create empty city', async () => {

    const res = await testServer
      .post('/cities')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({});

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors.body.name');

  });


  it('Do not create city with invalid name', async () => {

    const res = await testServer
      .post('/cities')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ name: 'Ma' });


    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors.body.name');


  });


  it('Do not create city with invalid field', async () => {

    const res = await testServer
      .post('/cities')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        nam: 'Inhambane'
      });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors.body.name');

  });


});