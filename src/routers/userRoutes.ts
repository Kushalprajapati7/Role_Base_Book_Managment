import userController from "../controllers/userController";
import { Router } from "express";
import { rbacMiddleware } from "../middleware/rbacMiddleware";
import verifyToken from "../middleware/authMiddleware";

const router = Router();

router.post('/register', userController.creatUser);
router.post('/login', userController.loginUser)
// router.get('/alluser', verifyToken, rbacMiddleware(['read','write']), userController.getAllUser)
router.get('/alluser', verifyToken, rbacMiddleware('write'), userController.getAllUser)


export default router;