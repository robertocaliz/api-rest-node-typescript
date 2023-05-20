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
exports.create = void 0;
const ETableNames_1 = require("../../ETableNames");
const knex_1 = require("../../knex");
const create = (city) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [id] = yield knex_1.Knex.insert(city)
            .into(ETableNames_1.ETableNames.cities);
        return id;
    }
    catch (error) {
        console.log(error);
        return new Error('Error trying to create city.');
    }
});
exports.create = create;
