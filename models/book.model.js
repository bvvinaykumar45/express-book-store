const { pgTable, varchar, text, uuid, index } = require("drizzle-orm/pg-core");
const authorsTable = require("./author.model.js");
const { sql } = require("drizzle-orm");

const booksTable = pgTable(
  "books",
  {
    id: uuid().primaryKey().defaultRandom(),
    title: varchar({ length: 100 }).notNull(),
    description: text(),
    authorId: uuid().references(() => authorsTable.id),
  },
  (table) => [
    index("title_full_text_search_index").using(
      "gin",
      sql`to_tsvector('english', ${table.title})`,
    ),
  ],
);

module.exports = booksTable;
