import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';



export async function up(knex: Knex) {

  knex
    .schema
    .createTable(ETableNames.cities, table => {
      table.bigIncrements('id').primary().index();
      table.string('name', 150).checkLength('<=', 150).index().notNullable();
      table.comment('Table used to store all system cities');
    })
    .then(() => {
      console.log(`# Table ${ETableNames.cities} created!`);
    });

}


export async function down(knex: Knex) {
  return knex
    .schema
    .dropSchema(ETableNames.cities);
}