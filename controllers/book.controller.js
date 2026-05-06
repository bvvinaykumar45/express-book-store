const { eq } = require("drizzle-orm");
const db = require("../db/index.js");
const booksTable = require("../models/book.model.js");

exports.getAllBooks = async function (req, res) {
  const books = await db.select().from(booksTable);
  return res.json(books);
};

exports.getBookById = async function (req, res) {
  const id = req.params.id;

  const [book] = await db
    .select()
    .from(booksTable)
    .where(eq(booksTable.id, id))
    .limit(1);

  if (!book)
    return res
      .status(404)
      .json({ error: `Book with id ${id} does not exists!` });

  return res.json(book);
};

exports.createBook = async function (req, res) {
  const { title, description, authorId } = req.body;

  if (!title || title === "")
    return res.status(400).json({ error: "title is required" });

  if (!authorId || authorId === "")
    return res.status(400).json({ error: "authorId is required" }); 

  const [result] = await db
    .insert(booksTable)
    .values({
      title,
      authorId,
      description,
    })
    .returning({
      id: booksTable.id,
    });

  return res
    .status(201)
    .json({ message: "Book created success", id: result.id });
};

exports.deleteBookById = async function (req, res) {
  const id = req.params.id;

  const result = await db
    .delete(booksTable)
    .where(eq(booksTable.id, id))
    .returning({
      id: booksTable.id,
    });
  console.log(result);

  if (result.length === 0) {
    return res
      .status(404)
      .json({ error: `Book with id ${id} does not exists.` });
  }

  return res.status(200).json({ message: "book deleted", id: result[0].id });
};
