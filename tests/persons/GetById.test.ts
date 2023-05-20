import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Person - Get by Id', () => {

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


  it('get person by id', async () => {

    const res1 = await testServer
      .post('/persons')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        fullName: 'Roberto Caliz',
        email: 'robertocaliz72@gmail.com',
        cityId: 5
      });


    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(res1.body as number).toBeGreaterThan(0);


    const res2 = await testServer
      .get(`/persons/${res1.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(res2.statusCode).toEqual(StatusCodes.OK);
    expect(res2.body).toHaveProperty('id' && 'fullName');
    expect(res2.body).toHaveProperty('email' && 'cityId');

  });



  it('Do not get person with invalid Id', async () => {

    const res = await testServer
      .get('/persons/-1')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors.params.id');

  });



  it('Do not get person who does not exist', async () => {

    const res = await testServer
      .get('/persons/9999')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();


    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty('errors.default');

  });

});