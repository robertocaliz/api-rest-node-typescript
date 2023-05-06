"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateById = exports.updateByIdValidation = void 0;
const middleware_1 = require("../../shared/middleware");
const yup_1 = require("yup");
exports.updateByIdValidation = (0, middleware_1.validation)((getSchema) => ({
    params: getSchema((0, yup_1.object)().shape({
        id: (0, yup_1.number)().integer().required().moreThan(0)
    })),
    body: getSchema((0, yup_1.object)().shape({
        name: (0, yup_1.string)().required().min(3),
    }))
}));
const updateById = (req, res) => {
    const { id } = req.params;
    res.send({
        message: 'updateById not  implemented!'
    });
};
exports.updateById = updateById;
