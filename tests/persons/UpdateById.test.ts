import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Person - Update', () => {


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


  it('update person', async () => {

    const rest1 = await testServer
      .post('/persons')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        fullName: 'Roberto Caliz',
        email: 'robertocaliz72@gmail.com',
        cityId: 5
      });

    expect(rest1.statusCode).toEqual(StatusCodes.CREATED);
    expect(rest1.body as number).toBeGreaterThan(0);



    const res2 = await testServer
      .put(`/persons/${rest1.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        fullName: 'Roberto Caliz',
        email: 'robertocaliz72@gmail.com',
        cityId: 1
      });


    expect(res2.status).toEqual(StatusCodes.NO_CONTENT);
    expect(res2.body).toEqual({});

  });



  it('Do not update person with invalid values', async () => {

    const res = await testServer
      .put('/persons/0')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        fullName: 'Roberto',
        email: 'InvalidEmail',
        cityId: 0
      });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors.params.id');
    expect(res.body).toHaveProperty('errors.body.fullName');
    expect(res.body).toHaveProperty('errors.body.email');
    expect(res.body).toHaveProperty('errors.body.cityId');


  });



  it('Do not update person who does not exist', async () => {

    const res = await testServer
      .put('/persons/9999')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        fullName: 'Roberto Caliz',
        email: 'robertocaliz72@gmail.com',
        cityId: 1
      });

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty('errors.default');

  });


});