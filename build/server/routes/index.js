"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const controllers_1 = require("./../controllers");
const middleware_1 = require("../shared/middleware");
const router = (0, express_1.Router)();
exports.router = router;
//Private routes
router.post('/cities', middleware_1.ensureAuthenticated, controllers_1.CitiesController.createValidation, controllers_1.CitiesController.create);
router.get('/cities', middleware_1.ensureAuthenticated, controllers_1.CitiesController.getAllValidation, controllers_1.CitiesController.getAll);
router.put('/cities/:id', middleware_1.ensureAuthenticated, controllers_1.CitiesController.updateByIdValidation, controllers_1.CitiesController.updateById);
router.get('/cities/:id', middleware_1.ensureAuthenticated, controllers_1.CitiesController.getByIdValidation, controllers_1.CitiesController.getById);
router.delete('/cities/:id', middleware_1.ensureAuthenticated, controllers_1.CitiesController.deleteByIdValidation, controllers_1.CitiesController.deleteById);
router.post('/persons', middleware_1.ensureAuthenticated, controllers_1.PersonsController.createValidation, controllers_1.PersonsController.create);
router.get('/persons', middleware_1.ensureAuthenticated, controllers_1.PersonsController.getAllValidation, controllers_1.PersonsController.getAll);
router.put('/persons/:id', middleware_1.ensureAuthenticated, controllers_1.PersonsController.updateByIdValidation, controllers_1.PersonsController.updateById);
router.get('/persons/:id', middleware_1.ensureAuthenticated, controllers_1.PersonsController.getByIdValidation, controllers_1.PersonsController.getById);
router.delete('/persons/:id', middleware_1.ensureAuthenticated, controllers_1.PersonsController.deleteByIdValidation, controllers_1.PersonsController.deleteById);
//Public routes
router.post('/sign-up', controllers_1.UsersController.signUpValidation, controllers_1.UsersController.signUp);
router.post('/sign-in', controllers_1.UsersController.signInValidation, controllers_1.UsersController.signIn);
