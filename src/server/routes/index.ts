import { Router } from 'express';
import { CitiesController, PersonsController, UsersController } from './../controllers';



const router = Router();


router.post('/cities', CitiesController.createValidation, CitiesController.create);
router.get('/cities', CitiesController.getAllValidation, CitiesController.getAll);
router.put('/cities/:id', CitiesController.updateByIdValidation, CitiesController.updateById);
router.get('/cities/:id', CitiesController.getByIdValidation, CitiesController.getById);
router.delete('/cities/:id', CitiesController.deleteByIdValidation, CitiesController.deleteById);



router.post('/persons', PersonsController.createValidation, PersonsController.create);
router.get('/persons', PersonsController.getAllValidation, PersonsController.getAll);
router.put('/persons/:id', PersonsController.updateByIdValidation, PersonsController.updateById);
router.get('/persons/:id', PersonsController.getByIdValidation, PersonsController.getById);
router.delete('/persons/:id', PersonsController.deleteByIdValidation, PersonsController.deleteById);



router.post('/sign-up', UsersController.signUpValidation, UsersController.signUp);
router.post('/sign-in', UsersController.signInValidation, UsersController.signIn);



export { router };