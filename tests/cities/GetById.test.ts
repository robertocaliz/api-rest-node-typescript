import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('City - Get By Id', () => {


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


  it('Get city by id', async () => {

    const res1 = await testServer
      .post('/cities')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ name: 'Maputo' });


    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(res1.body as number).toBeGreaterThan(0);


    const res2 = await testServer
      .get(`/cities/${res1.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();


    expect(res2.statusCode).toEqual(StatusCodes.OK);
    expect(res2.body).toHaveProperty('name');

  });



  it('Get city using invalid id', async () => {


    const res1 = await testServer
      .get('/cities/E')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();


    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.params.id');


    const res2 = await testServer
      .get('/cities/0')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(res2.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.params.id');



    const res3 = await testServer
      .get('/cities/-1')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();


    expect(res3.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res3.body).toHaveProperty('errors.params.id');


  });



  it('Get city who does not exist', async () => {

    const res = await testServer
      .get('/cities/9999')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();


    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty('errors.default');

  });


});