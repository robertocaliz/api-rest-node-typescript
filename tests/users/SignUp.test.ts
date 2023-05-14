
import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('User - sign up', () => {


  //Test 1
  it('sign up', async () => {

    const res = await testServer
      .post('/sign-up')
      .send({
        name: 'robertocaliz',
        email: 'robertocaliz72@gmail.com',
        password: 'roberto1999'
      });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);
    expect(Number(res.body)).toBeGreaterThan(0);

  });

  // Test 2
  it('Do not sign up users with the same e-mail', async () => {

    const res1 = await testServer
      .post('/sign-up')
      .send({
        name: 'robertomachava',
        email: 'robertomachava@gmail.com',
        password: 'roberto01999'
      });


    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(Number(res1.body)).toBeGreaterThan(0);

    const res2 = await testServer
      .post('/sign-up')
      .send({
        name: 'robertomachava',
        email: 'robertomachava@gmail.com',
        password: 'roberto01999'
      });


    expect(res2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res2.body).toHaveProperty('errors.default');

  });



  //test 3
  it('Do not sign up user with invalid values', async () => {

    const res = await testServer
      .post('/sign-up')
      .send({
        name: 'ro',
        email: 'robertocaliz',
        password: 'case1'
      });


    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors.body.name');
    expect(res.body).toHaveProperty('errors.body.email');
    expect(res.body).toHaveProperty('errors.body.password');


  });


  //test 4
  it('Do not sign user with invalid properties', async () => {

    const res = await testServer
      .post('/sign-up')
      .send({
        names: 'robertocaliz',
        emails: 'robertocaliz72@gmail.com',
        passwords: 'JIT compiler'
      });


    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors.body.name');
    expect(res.body).toHaveProperty('errors.body.email');
    expect(res.body).toHaveProperty('errors.body.password');

  });


  //test 5
  it('Do not sign up empty user', async () => {

    const res = await testServer
      .post('/sign-up')
      .send({});


    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors.body.name');
    expect(res.body).toHaveProperty('errors.body.email');
    expect(res.body).toHaveProperty('errors.body.password');


  });


});