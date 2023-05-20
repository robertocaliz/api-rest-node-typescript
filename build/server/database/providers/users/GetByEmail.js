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
exports.getByEmail = void 0;
const ETableNames_1 = require("../../ETableNames");
const knex_1 = require("../../knex");
const getByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [user] = yield knex_1.Knex
            .select('*')
            .from(ETableNames_1.ETableNames.users)
            .where({ email });
        return user;
    }
    catch (error) {
        console.log(error);
        return new Error('Error trying to get user');
    }
});
exports.getByEmail = getByEmail;
