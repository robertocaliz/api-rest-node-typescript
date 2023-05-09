import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.persons, table => {
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
}


export async function down(knex: Knex) {
  return knex
    .schema
    .dropTableIfExists(ETableNames.persons);
}