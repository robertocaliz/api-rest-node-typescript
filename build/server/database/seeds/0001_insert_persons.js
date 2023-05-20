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
exports.seed = void 0;
const ETableNames_1 = require("../ETableNames");
const seed = (knex) => __awaiter(void 0, void 0, void 0, function* () {
    const [{ count }] = yield knex
        .from(ETableNames_1.ETableNames.persons)
        .count({ count: 'fullName' });
    if (count > 0)
        return;
    yield knex(ETableNames_1.ETableNames.persons).insert(persons);
});
exports.seed = seed;
const persons = [
    {
        fullName: 'Roberto Caliz',
        email: 'roberto@gmail.com',
        cityId: 1
    },
    {
        fullName: 'Dalton Andre',
        email: 'dalton@gmail.com',
        cityId: 8
    },
    {
        fullName: 'Carlos Sousa',
        email: 'carlos@gmail.com',
        cityId: 2
    },
    {
        fullName: 'Edy Carlos',
        email: 'edy@gmail.com',
        cityId: 8
    },
    {
        fullName: 'Kat Sousa',
        email: 'sousa@gmail.com',
        cityId: 6
    },
    {
        fullName: 'Elton andre',
        email: 'elton@gmail.com',
        cityId: 11
    },
    {
        fullName: 'Pedro Antonio',
        email: 'pedro@gmail.com',
        cityId: 9
    },
    {
        fullName: 'Felix Eur',
        email: 'feliz@gmail.com',
        cityId: 3
    },
    {
        fullName: 'Eduardo Fum',
        email: 'eduardo@gmail.com',
        cityId: 2
    },
    {
        fullName: 'Carlos Enrique',
        email: 'enrique@gmail.com',
        cityId: 1
    },
    {
        fullName: 'Edson Cam',
        email: 'edson@gmail.com',
        cityId: 2
    },
    {
        fullName: 'Pedro antonio',
        email: 'antonio.p@gmail.com',
        cityId: 6
    },
    {
        fullName: 'Alfeu Andre',
        email: 'alfeu@gmail.com',
        cityId: 9
    }
];
