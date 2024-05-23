import AuthorController from "../controllers/authorController";
import { Router } from "express";
import verifyToken from "../middleware/authMiddleware";
import { rbacMiddleware } from "../middleware/rbacMiddleware";

const router = Router()


router.post('/addAuthor', verifyToken,rbacMiddleware('write'),AuthorController.addauthor)
router.put('/updateAuthor/:id', verifyToken,rbacMiddleware('write'),AuthorController.updateAuthor)
router.delete('/deleteAuthor/:id', verifyToken,rbacMiddleware('delete'),AuthorController.deleteAuthor)
router.get('/authorById/:id', verifyToken, rbacMiddleware('read'),AuthorController.getAuthorById)
router.get('/allAuthor',verifyToken, rbacMiddleware('read'), AuthorController.getAllAuthor)


export default router;
