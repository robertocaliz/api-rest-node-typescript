import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';



export const seed = async (knex: Knex) => {

  const [{ count }] = await knex(ETableNames.cities)
    .count<[{ count: number }]>('* as count');

  if (count > 0) return;


  const citiesToInsert = mozambicanCities.map(cityName => ({ name: cityName }));

  await knex.insert(citiesToInsert)
    .into(ETableNames.cities);

};


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