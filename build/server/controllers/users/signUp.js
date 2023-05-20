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
exports.signUp = exports.signUpValidation = void 0;
const users_1 = require("../../database/providers/users");
const http_status_codes_1 = require("http-status-codes");
const middleware_1 = require("../../shared/middleware");
const yup_1 = require("yup");
exports.signUpValidation = (0, middleware_1.validation)(getSchema => ({
    body: getSchema((0, yup_1.object)().shape({
        name: (0, yup_1.string)().required().min(3),
        email: (0, yup_1.string)().required().email().min(7),
        password: (0, yup_1.string)().required().min(8)
    }))
}));
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = yield users_1.UsersProvider.create(req.body);
    if (id instanceof Error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({
            errors: {
                default: id.message
            }
        });
    }
    res.status(http_status_codes_1.StatusCodes.CREATED).json(id);
});
exports.signUp = signUp;
