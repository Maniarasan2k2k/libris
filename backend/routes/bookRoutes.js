import express from 'express';
const router = express.Router();
import { createBook, getAllBooks, getBookById, updateBook, deleteBook } from '../controllers/bookController.js';

router.route('/')
  .post(createBook)
  .get(getAllBooks);

router.route('/:id')
  .get(getBookById)
  .put(updateBook)
  .delete(deleteBook);

export default router;
