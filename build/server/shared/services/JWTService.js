"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTService = void 0;
const Jwt = __importStar(require("jsonwebtoken"));
var EJWTErrorMessages;
(function (EJWTErrorMessages) {
    EJWTErrorMessages["SECRET_NOT_FOUND"] = "JWT_SECRET_NOT_FOUND";
    EJWTErrorMessages["INVALID_TOKEN"] = "INVALID_TOKEN";
})(EJWTErrorMessages || (EJWTErrorMessages = {}));
const jwtSecret = process.env.JWT_SECRET;
const sign = (data) => {
    if (!jwtSecret)
        return EJWTErrorMessages.SECRET_NOT_FOUND;
    return Jwt.sign(data, jwtSecret, { expiresIn: '1h' });
};
const verify = (token) => {
    if (!jwtSecret)
        return EJWTErrorMessages.SECRET_NOT_FOUND;
    try {
        const payload = Jwt.verify(token, jwtSecret);
        if (typeof payload === 'string') {
            return EJWTErrorMessages.INVALID_TOKEN;
        }
        return payload;
    }
    catch (error) {
        console.log(error);
        return EJWTErrorMessages.INVALID_TOKEN;
    }
};
exports.JWTService = {
    sign,
    verify,
    EJWTErrorMessages
};
