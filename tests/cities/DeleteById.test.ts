import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('City - Delete By Id', () => {

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



  it('Delete city by id', async () => {

    const res1 = await testServer
      .post('/cities')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ name: 'Tete' });


    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(res1.body as number).toBeGreaterThan(0);


    const res2 = await testServer
      .delete(`/cities/${res1.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();


    expect(res2.statusCode).toEqual(StatusCodes.NO_CONTENT);
    expect(res2.body).toEqual({});

  });


  it('Do not delete city who does not exist', async () => {

    const res1 = await testServer
      .delete('/cities/9999')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');

  });


  it('Do not delete city using invalid id', async () => {


    const res1 = await testServer
      .delete('/cities/0')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();


    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.params.id');


    const res2 = await testServer
      .delete('/cities/aaa')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();


    expect(res2.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res2.body).toHaveProperty('errors.params.id');



    const res3 = await testServer
      .delete('/cities/-1')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(res3.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res3.body).toHaveProperty('errors.params.id');


  });

});