"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getById = exports.getByIdValidation = void 0;
const middleware_1 = require("../../shared/middleware");
const yup_1 = require("yup");
exports.getByIdValidation = (0, middleware_1.validation)((getSchema => ({
    params: getSchema((0, yup_1.object)().shape({
        id: (0, yup_1.number)().integer().required().moreThan(0)
    }))
})));
const getById = (req, res) => {
    const { id } = req.params;
    console.log(id);
    res.json({
        message: 'GetById not implemented!'
    });
};
exports.getById = getById;
