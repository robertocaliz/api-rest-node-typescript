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
    const [{ count }] = yield knex(ETableNames_1.ETableNames.cities)
        .count('* as count');
    if (count > 0)
        return;
    const citiesToInsert = mozambicanCities.map(cityName => ({ name: cityName }));
    yield knex.insert(citiesToInsert)
        .into(ETableNames_1.ETableNames.cities);
});
exports.seed = seed;
const mozambicanCities = [
    'Maputo',
    'Matola',
    'Nampula',
    'Beira',
    'Chimoio',
    'Quelimane',
    'Nacala',
    'Mocuba',
    'Tete',
    'Gorué',
    'Lichinga',
    'Pemba',
    'Xai-Xai',
    'Maxixe',
    'Angoche',
    'Cuamba',
    'Montepuez',
    'Dondo',
    'Inhambane',
    'Chibuto',
    'Chócue',
    'Ilha de Moçambique',
    'Manica',
    'Moatize',
    'Vilanculos'
];
