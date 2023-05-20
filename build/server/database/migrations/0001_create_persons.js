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
exports.down = exports.up = void 0;
const ETableNames_1 = require("../ETableNames");
function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex
            .schema
            .createTable(ETableNames_1.ETableNames.persons, table => {
            table
                .bigIncrements('id')
                .primary();
            table.string('fullName', 150)
                .checkLength('<=', 150)
                .notNullable()
                .index();
            table.string('email', 150)
                .checkLength('<=', 150)
                .unique()
                .notNullable();
            table.bigint('cityId')
                .unsigned()
                .notNullable();
            table
                .foreign('cityId')
                .references('cities.id');
        })
            .then(() => {
            console.log('#Table persons created!');
        });
    });
}
exports.up = up;
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex
            .schema
            .dropTableIfExists(ETableNames_1.ETableNames.persons);
    });
}
exports.down = down;
