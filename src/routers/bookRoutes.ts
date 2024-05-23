import { Router } from "express";
import verifyToken from "../middleware/authMiddleware";
import { rbacMiddleware } from "../middleware/rbacMiddleware";
import BookController from "../controllers/bookController";

const router = Router()

router.post('/addBook', verifyToken, rbacMiddleware('write'), BookController.createBook)
router.put('/updateBook/:id', verifyToken, rbacMiddleware('write'), BookController.updateBook)
router.delete('/deleteBook/:id', verifyToken, rbacMiddleware('delete'), BookController.deleteBook)
router.get('/allBook', verifyToken, rbacMiddleware('read'), BookController.showAllBook)
router.get('/bookById/:id', verifyToken, rbacMiddleware('read'), BookController.showBookById)
router.get('/bookByAuthorId/:id', verifyToken, rbacMiddleware('read'), BookController.showBooksByAuthor)
export default router;