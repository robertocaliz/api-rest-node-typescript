import { Router } from 'express';
import { CityController, PersonController } from './../controllers';


const router = Router();


router.post('/cities', CityController.createValidation, CityController.create);
router.get('/cities', CityController.getAllValidation, CityController.getAll);
router.put('/cities/:id', CityController.updateByIdValidation, CityController.updateById);
router.get('/cities/:id', CityController.getByIdValidation, CityController.getById);
router.delete('/cities/:id', CityController.deleteByIdValidation, CityController.deleteById);



router.post('/persons', PersonController.createValidation, PersonController.create);
router.get('/persons', PersonController.getAllValidation, PersonController.getAll);
router.put('/persons/:id', PersonController.updateByIdValidation, PersonController.updateById);
router.get('/persons/:id', PersonController.getByIdValidation, PersonController.getById);
router.delete('/persons/:id', PersonController.deleteByIdValidation, PersonController.deleteById);



export { router };