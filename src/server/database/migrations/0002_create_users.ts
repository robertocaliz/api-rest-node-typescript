import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';



export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.users, table => {

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
      console.log(`# Table ${ETableNames.users} created!`);
    });
}


export async function down(knex: Knex) {
  knex
    .schema
    .dropTableIfExists(ETableNames.users)
    .then(() => {
      console.log(`${ETableNames.users} table was dropped!`);
    });
}