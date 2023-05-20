import { describe } from 'node:test';
import { testServer } from '../jest.setup';
import { StatusCodes } from 'http-status-codes';


describe('person creation', () => {


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

  it('create person', async () => {


    const res3 = await testServer
      .post('/persons')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        fullName: 'Roberto Caliz',
        email: 'robertocaliz72@gmail.com',
        cityId: 5
      });

    expect(res3.statusCode).toEqual(StatusCodes.CREATED);
    expect(res3.body as number).toBeGreaterThan(0);

  });



  it('Do not create person with invalid values', async () => {

    const res2 = await testServer
      .post('/persons')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        fullName: 'Roberto',
        email: 'InvalidEmail',
        cityId: 0
      });

    expect(res2.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res2.body).toHaveProperty('errors.body.fullName');
    expect(res2.body).toHaveProperty('errors.body.email');
    expect(res2.body).toHaveProperty('errors.body.cityId');

  });


  it('Do not create person with invalid fields', async () => {

    const res = await testServer
      .post('/persons')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        fullNam: 'robertocaliz',
        mail: 'robertocaliz@gamail.com',
        cityI: 1
      });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors.body.fullName');
    expect(res.body).toHaveProperty('errors.body.email');
    expect(res.body).toHaveProperty('errors.body.cityId');

  });


  it('Do not create empty person', async () => {

    const res = await testServer
      .post('/persons')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({});

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors.body.fullName');
    expect(res.body).toHaveProperty('errors.body.email');
    expect(res.body).toHaveProperty('errors.body.cityId');

  });


  it('Do not create persons with the same e-mails', async () => {

    const res1 = await testServer
      .post('/persons')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        fullName: 'Eugenio Felix',
        email: 'eugenio@gmail.com',
        cityId: 2
      });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(res1.body).toBeGreaterThan(0);


    const res2 = await testServer
      .post('/persons')
      .set({ Authorization: `Bearer ${accessToken}` })
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
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        fullName: 'Roberto Caliz',
        email: 'robertocaliz72@gmail.com',
        cityId: 99999
      });


    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty('errors.default');

  });

});