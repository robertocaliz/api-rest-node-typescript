"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = exports.getAllValidation = void 0;
const middleware_1 = require("../../shared/middleware");
const yup_1 = require("yup");
const providers_1 = require("../../database/providers");
const http_status_codes_1 = require("http-status-codes");
exports.getAllValidation = (0, middleware_1.validation)(getSchema => ({
    query: getSchema((0, yup_1.object)().shape({
        page: (0, yup_1.number)().integer().optional().moreThan(0),
        limit: (0, yup_1.number)().integer().optional().moreThan(0),
        filter: (0, yup_1.string)().optional()
    }))
}));
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const persons = yield providers_1.PersonsProvider.getAll(req.query);
    if (persons instanceof Error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({
            errors: {
                default: persons.message
            }
        });
    }
    const count = yield providers_1.PersonsProvider.count(req.query.filter);
    if (count instanceof Error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({
            errors: {
                default: count.message
            }
        });
    }
    res.setHeader('access-control-expose-headers', 'x-total-count');
    res.setHeader('x-total-count', count);
    res.status(http_status_codes_1.StatusCodes.OK).json(persons);
});
exports.getAll = getAll;
