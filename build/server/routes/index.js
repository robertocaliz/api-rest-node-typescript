"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const controllers_1 = require("./../controllers");
const router = (0, express_1.Router)();
exports.router = router;
router.post('/cities', controllers_1.CityController.createValidation, controllers_1.CityController.create);
router.get('/cities', controllers_1.CityController.getAllValidation, controllers_1.CityController.getAll);
router.put('/cities/:id', controllers_1.CityController.updateByIdValidation, controllers_1.CityController.updateById);
router.get('/cities/:id', controllers_1.CityController.getByIdValidation, controllers_1.CityController.getById);
router.delete('/cities/:id', controllers_1.CityController.deleteByIdValidation, controllers_1.CityController.deleteById);
