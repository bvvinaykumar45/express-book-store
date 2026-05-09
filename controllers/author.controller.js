const { eq } = require("drizzle-orm");
const db = require("../db/index.js");
const authorsTable = require("../models/author.model.js");
const booksTable = require("../models/book.model.js");
const emailValidator = require("../helpers/emailValidator.js");

exports.getAllAuthors = async function (req, res) {
  const authors = await db.select().from(authorsTable);

  return res.status(200).json(authors);
};

exports.getAuthorById = async function (req, res) {
  const id = req.params.id;

  const [author] = await db
    .select()
    .from(authorsTable)
    .where(eq(authorsTable.id, id));

  if (!author) {
    return res
      .status(404)
      .json({ error: `Author with id ${id} does not exists!` });
  }

  return res.status(200).json(author);
};

exports.getAllBooksByAuthorId = async function (req, res) {
  const id = req.params.id;

  const books = await db.select().from(booksTable).where(eq(booksTable.authorId, id));

  return res.status(200).json(books);
}

exports.createAuthor = async function (req, res) {
  const { firstName, lastName, email } = req.body;

  if (!firstName || firstName === "") {
    return res.status(400).json({ error: "firstName is required" });
  }

  if (!email || email === "") {
    return res.status(400).json({ error: "email is required" });
  }

  if (!emailValidator(email)) {
    return res.status(400).json({ error: "email is invalid" });
  }

  const [result] = await db
    .insert(authorsTable)
    .values({
      firstName,
      lastName,
      email,
    })
    .returning({ id: authorsTable.id });

  return res
    .status(201)
    .json({ message: "Author created successfully", id: result.id });
};

exports.deleteAuthorById = async function (req, res) {
  const id = req.params.id;

  const [result] = await db
    .delete(authorsTable)
    .where(eq(authorsTable.id, id))
    .returning({ id: authorsTable.id });

  if (!result) {
    return res
      .status(404)
      .json({ error: `Author with id ${id} does not exists` });
  }

  return res
    .status(200)
    .json({ message: "Author deleted successfully", id: result.id });
};
