import roleController from "../controllers/roleController";
import { Router } from "express";

const router =  Router();

router.post('/add', roleController.createRole)
export default router