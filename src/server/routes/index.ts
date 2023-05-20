import { Router } from 'express';
import { CitiesController, PersonsController, UsersController } from './../controllers';
import { ensureAuthenticated } from '../shared/middleware';


const router = Router();


router.get('/', (req, res) => {
  res.send('Hello Robert!');
});


//Private routes

router.post('/cities', ensureAuthenticated, CitiesController.createValidation, CitiesController.create);
router.get('/cities', ensureAuthenticated, CitiesController.getAllValidation, CitiesController.getAll);
router.put('/cities/:id', ensureAuthenticated, CitiesController.updateByIdValidation, CitiesController.updateById);
router.get('/cities/:id', ensureAuthenticated, CitiesController.getByIdValidation, CitiesController.getById);
router.delete('/cities/:id', ensureAuthenticated, CitiesController.deleteByIdValidation, CitiesController.deleteById);



router.post('/persons', ensureAuthenticated, PersonsController.createValidation, PersonsController.create);
router.get('/persons', ensureAuthenticated, PersonsController.getAllValidation, PersonsController.getAll);
router.put('/persons/:id', ensureAuthenticated, PersonsController.updateByIdValidation, PersonsController.updateById);
router.get('/persons/:id', ensureAuthenticated, PersonsController.getByIdValidation, PersonsController.getById);
router.delete('/persons/:id', ensureAuthenticated, PersonsController.deleteByIdValidation, PersonsController.deleteById);


//Public routes

router.post('/sign-up', UsersController.signUpValidation, UsersController.signUp);
router.post('/sign-in', UsersController.signInValidation, UsersController.signIn);



export { router };