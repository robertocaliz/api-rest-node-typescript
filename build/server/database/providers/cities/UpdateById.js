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
exports.updateById = void 0;
const EQueryStates_1 = require("../../EQueryStates");
const ETableNames_1 = require("../../ETableNames");
const knex_1 = require("../../knex");
const updateById = (city, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryState = yield (0, knex_1.Knex)(ETableNames_1.ETableNames.cities)
            .update(city)
            .where({ id });
        if (queryState === EQueryStates_1.QueryStates.NOT_EXECUTED) {
            return new Error('Error trying to update city');
        }
    }
    catch (error) {
        console.log(error);
        return new Error('Error trying to update city');
    }
});
exports.updateById = updateById;
