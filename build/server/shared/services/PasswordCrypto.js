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
exports.PasswordCrypto = void 0;
const bcryptjs_1 = require("bcryptjs");
const RANDOM_CHARACTERS_NUMBER = 8;
const getHash = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield (0, bcryptjs_1.genSalt)(RANDOM_CHARACTERS_NUMBER);
    return yield (0, bcryptjs_1.hash)(password, salt);
});
const equals = (password, hash) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, bcryptjs_1.compare)(password, hash);
});
exports.PasswordCrypto = {
    getHash,
    equals
};
