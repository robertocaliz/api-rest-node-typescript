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
exports.signIn = exports.signInValidation = void 0;
const middleware_1 = require("../../shared/middleware");
const yup_1 = require("yup");
const providers_1 = require("../../database/providers");
const http_status_codes_1 = require("http-status-codes");
const services_1 = require("../../shared/services");
exports.signInValidation = (0, middleware_1.validation)(getSchema => ({
    body: getSchema((0, yup_1.object)().shape({
        email: (0, yup_1.string)().email().required().min(7),
        password: (0, yup_1.string)().required().min(8)
    }))
}));
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield providers_1.UsersProvider.getByEmail(email);
    if (user instanceof Error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({
            errors: {
                default: user.message
            }
        });
    }
    if (!(user) || !(yield services_1.PasswordCrypto.equals(password, user.password))) {
        return res
            .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
            .json({
            errors: {
                default: 'Invalid e-mail or password!'
            }
        });
    }
    const accessToken = services_1.JWTService.sign({ uid: user.id });
    if (accessToken === services_1.JWTService.EJWTErrorMessages.SECRET_NOT_FOUND) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({
            errors: {
                default: 'Error trying to generate access token'
            }
        });
    }
    res.status(http_status_codes_1.StatusCodes.OK).json(accessToken);
});
exports.signIn = signIn;
