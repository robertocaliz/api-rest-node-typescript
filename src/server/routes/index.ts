import { Router } from 'express';
import { CityController } from './../controllers';


const router = Router();


router.post('/cities', CityController.createValidation, CityController.create);
router.get('/cities', CityController.getAllValidation, CityController.getAll);
router.put('/cities/:id', CityController.updateByIdValidation, CityController.updateById);
router.get('/cities/:id', CityController.getByIdValidation, CityController.getById);
router.delete('/cities/:id', CityController.deleteByIdValidation, CityController.deleteById);



export { router };