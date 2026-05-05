const { pgTable, varchar, uuid } = require('drizzle-orm/pg-core');
const { lstatSync } = require('node:fs');

const authorsTable = pgTable('authors', {
  id: uuid().primaryKey().defaultRandom(),
  firstName: varchar({length: 64}).notNull(),
  lastName: varchar({length: 64}),
  email: varchar({length: 255}).notNull().unique()
});

module.exports = authorsTable;
