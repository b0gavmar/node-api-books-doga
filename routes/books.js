import express from 'express';
import { dbQuery, dbRun } from "../database.js";

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const books = await dbQuery("SELECT * FROM books");
        res.status(200).json(books);
    }
    catch (error) {
        next(error);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const result = await dbRun("INSERT INTO books (title, author, description, year) VALUES (?, ?, ?, ?);", [req.body.title, req.body.author, req.body.description, req.body.year]);
        res.status(201).json({ id: result.lastID, ...req.body });
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const [book] = await dbQuery("SELECT * FROM books WHERE id =?", [req.params.id]);
        if (!book) return res.status(404).json({ message: "Nem lehet megtalálni a könyvet" });
        res.status(200).json(book);
    }
    catch (error) {
        next(error);
    }
});

export default router;