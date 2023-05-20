import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('User - sign in', () => {

  it('sign in', async () => {

    const tokenPatter = /^.{1,}\..{1,}\..{1,}$/;

    const res1 = await testServer
      .post('/sign-up')
      .send({
        name: 'gersonzandamela',
        email: 'gersonzandamela@visabeira.mz',
        password: 'zandamela1999'
      });


    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(Number(res1.body)).toBeGreaterThan(0);


    const res2 = await testServer
      .post('/sign-in')
      .send({
        email: 'gersonzandamela@visabeira.mz',
        password: 'zandamela1999'
      });


    expect(res2.statusCode).toEqual(StatusCodes.OK);
    expect(tokenPatter.test(res2.body)).toEqual(true);

  });



  it('Do not authenticate user with invalid e-mail', async () => {


    const res1 = await testServer
      .post('/sign-up')
      .send({
        name: 'marco caliz',
        email: 'marcocaliz72@gmail.com',
        password: 'marco005'
      });


    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(res1.body).toBeGreaterThan(0);


    const res = await testServer
      .post('/sign-in')
      .send({
        email: 'marcocaliz84@gmail.com',
        password: 'marco005'
      });

    expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res.body).toHaveProperty('errors.default');

  });



  it('Do not authenticate user with invalid password', async () => {


    const res1 = await testServer
      .post('/sign-up')
      .send({
        name: 'edson pedro',
        email: 'pedro72@gmail.com',
        password: 'pedro005'
      });


    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(res1.body).toBeGreaterThan(0);


    const res = await testServer
      .post('/sign-in')
      .send({
        email: 'pedro72@gmail.com',
        password: 'marco005'
      });

    expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res.body).toHaveProperty('errors.default');

  });



  it('Do not authenticate user with invalid properties', async () => {

    const res = await testServer
      .post('/sign-in')
      .send({
        emails: 'robertocaliz72@gmail.com',
        passwords: 'robertocaliz'
      });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors.body.email');
    expect(res.body).toHaveProperty('errors.body.password');

  });



  it('Do not authenticate empty user', async () => {

    const res = await testServer
      .post('/sign-in')
      .send({});


    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors.body.email');
    expect(res.body).toHaveProperty('errors.body.password');

  });

});