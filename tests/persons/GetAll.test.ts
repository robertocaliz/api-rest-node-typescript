import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Person - get all', () => {


  const accessTokenPatter = /^.{1,}\..{1,}\..{1,}$/;


  let accessToken: string;


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
      .post('/persons')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        fullName: 'Roberto Caliz',
        email: 'robertocaliz72@gmail.com',
        cityId: 7
      });

    expect(res3.statusCode).toEqual(StatusCodes.CREATED);
    expect(res3.body as number).toBeGreaterThan(0);


    const res4 = await testServer
      .post('/persons')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        fullName: 'Marco Caliz',
        email: 'marcocaliz72@gmail.com',
        cityId: 1
      });


    expect(res4.statusCode).toEqual(StatusCodes.CREATED);
    expect(res4.body as number).toBeGreaterThan(0);


  });


  it('Get persons of first page', async () => {

    const res3 = await testServer
      .get('/persons')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();


    expect(res3.statusCode).toEqual(StatusCodes.OK);
    expect(res3.body.length).toBeGreaterThanOrEqual(2);
    expect(Number(res3.header['x-total-count'])).toBeGreaterThan(0);


  });


  it('Do not get persons of invalid page', async () => {

    const res = await testServer
      .get('/cities?page=0')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();


    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors.query.page');

  });



  it('Get person where name like %Caliz%', async () => {

    const res = await testServer
      .get('/persons?filter=Caliz')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();


    expect(res.statusCode).toEqual(StatusCodes.OK);
    expect(res.body.length).toBeGreaterThanOrEqual(2);
    expect(Number(res.header['x-total-count'])).toBeGreaterThan(0);

  });

});