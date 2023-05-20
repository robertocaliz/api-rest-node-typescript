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
            .createTable(ETableNames_1.ETableNames.users, table => {
            table
                .bigIncrements('id')
                .primary();
            table
                .string('name')
                .checkLength('>=', 3)
                .notNullable();
            table
                .string('email')
                .index()
                .checkLength('>=', 7)
                .unique()
                .notNullable();
            table
                .string('password')
                .checkLength('>=', 8)
                .notNullable();
            table.comment('Table used to store system users!');
        })
            .then(() => {
            console.log(`# Table ${ETableNames_1.ETableNames.users} created!`);
        });
    });
}
exports.up = up;
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        knex
            .schema
            .dropTableIfExists(ETableNames_1.ETableNames.users)
            .then(() => {
            console.log(`${ETableNames_1.ETableNames.users} table was dropped!`);
        });
    });
}
exports.down = down;
