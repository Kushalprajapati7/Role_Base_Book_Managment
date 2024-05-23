import categoryController from "../controllers/categoryController";
import { Router } from "express";
import verifyToken from "../middleware/authMiddleware";
import { rbacMiddleware } from "../middleware/rbacMiddleware";

const router = Router();

router.post('/addCategory', verifyToken,rbacMiddleware('write'),categoryController.create)
router.put('/updateCategory/:id', verifyToken,rbacMiddleware('write'),categoryController.update)
router.delete('/deleteCategory/:id', verifyToken,rbacMiddleware('delete'),categoryController.delete)
router.get('/categoryById/:id', verifyToken, rbacMiddleware('read'),categoryController.categoryById)
router.get('/allCategory',verifyToken, rbacMiddleware('read'), categoryController.allCategory)


export default router;