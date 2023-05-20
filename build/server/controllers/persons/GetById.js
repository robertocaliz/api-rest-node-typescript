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
exports.getById = exports.getByIdValidation = void 0;
const providers_1 = require("../../database/providers");
const http_status_codes_1 = require("http-status-codes");
const middleware_1 = require("../../shared/middleware");
const yup_1 = require("yup");
exports.getByIdValidation = (0, middleware_1.validation)(getSchema => ({
    params: getSchema((0, yup_1.object)().shape({
        id: (0, yup_1.number)().integer().required().moreThan(0)
    }))
}));
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id = 0 } = req.params;
    const result = yield providers_1.PersonsProvider.getById(id);
    if (result instanceof Error) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({
            errors: {
                default: result.message
            }
        });
    }
    res.status(http_status_codes_1.StatusCodes.OK).json(result);
});
exports.getById = getById;