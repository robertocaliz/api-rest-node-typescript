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
exports.updateById = exports.updateByIdValidation = void 0;
const providers_1 = require("../../database/providers");
const http_status_codes_1 = require("http-status-codes");
const middleware_1 = require("../../shared/middleware");
const yup_1 = require("yup");
exports.updateByIdValidation = (0, middleware_1.validation)(getSchema => ({
    params: getSchema((0, yup_1.object)().shape({
        id: (0, yup_1.number)().integer().required().moreThan(0)
    })),
    body: getSchema((0, yup_1.object)().shape({
        fullName: (0, yup_1.string)().required().min(10).max(150),
        email: (0, yup_1.string)().required().email(),
        cityId: (0, yup_1.number)().integer().required().moreThan(0)
    }))
}));
const updateById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id = 0 } = req.params;
    const result = yield providers_1.PersonsProvider.updateById(req.body, id);
    if (result instanceof Error) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({
            errors: {
                default: result.message
            }
        });
    }
    res.status(http_status_codes_1.StatusCodes.NO_CONTENT).send();
});
exports.updateById = updateById;