import { Router } from 'express';


import { StatusCodes } from 'http-status-codes';


const { OK } = StatusCodes;


const router = Router();


router.get('/', (req, res) => {
  res.send(
    {
      message: 'Hi dev!'
    }
  );
});


router.post('/cars', (req, res) => {
  const car = req.body;
  res.status(OK).json(car);
});



export { router };