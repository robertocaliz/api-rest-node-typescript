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
exports.create = exports.createValidation = void 0;
const middleware_1 = require("../../shared/middleware");
const yup_1 = require("yup");
const http_status_codes_1 = require("http-status-codes");
const providers_1 = require("../../database/providers");
exports.createValidation = (0, middleware_1.validation)((getSchema) => ({
    body: getSchema((0, yup_1.object)().shape({
        name: (0, yup_1.string)().required().min(3).max(150),
    }))
}));
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield providers_1.CitiesProvider.create(req.body);
    if (result instanceof Error) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({
            errors: {
                default: result.message
            }
        });
    }
    res.status(http_status_codes_1.StatusCodes.CREATED).json(result);
});
exports.create = create;
