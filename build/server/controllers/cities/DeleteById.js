"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteById = exports.deleteByIdValidation = void 0;
const middleware_1 = require("../../shared/middleware");
const yup_1 = require("yup");
exports.deleteByIdValidation = (0, middleware_1.validation)((getSchema) => ({
    params: getSchema((0, yup_1.object)().shape({
        id: (0, yup_1.number)().integer().required().moreThan(0)
    }))
}));
const deleteById = (req, res) => {
    res.send({
        message: 'Delete action not implemented!'
    });
};
exports.deleteById = deleteById;
