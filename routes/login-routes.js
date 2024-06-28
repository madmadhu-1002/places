import express from "express";
import verifyUser from "../controllers/login-controller.js";
const router = express.Router();


router.post('/', verifyUser);

export default router