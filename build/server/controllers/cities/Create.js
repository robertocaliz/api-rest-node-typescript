"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.createValidation = void 0;
const middleware_1 = require("../../shared/middleware");
const yup_1 = require("yup");
exports.createValidation = (0, middleware_1.validation)((getSchema) => ({
    body: getSchema((0, yup_1.object)().shape({
        name: (0, yup_1.string)().required().min(3),
    }))
}));
const create = (req, res) => {
    res.json({
        message: 'City Created!'
    });
};
exports.create = create;
