"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = exports.getAllValidation = void 0;
const middleware_1 = require("../../shared/middleware");
const yup_1 = require("yup");
exports.getAllValidation = (0, middleware_1.validation)((getSchema) => ({
    query: getSchema((0, yup_1.object)().shape({
        page: (0, yup_1.number)().optional().moreThan(0),
        limit: (0, yup_1.number)().optional().moreThan(0),
        filter: (0, yup_1.string)().optional()
    }))
}));
const getAll = (req, res) => {
    const { page, limit, filter } = req.query;
    res.json({
        message: 'Not implemented'
    });
};
exports.getAll = getAll;
