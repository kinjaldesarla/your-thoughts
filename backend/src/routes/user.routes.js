import {Router} from "express";
import { loginUser, logoutUser, resgisterUser } from "../controllers/user.controllers.js";
import {verifyjwt} from '../middlewares/Auth.middlewares.js'
const router=Router();

router.route("/register").post(resgisterUser);
router.route("/login").post(loginUser)
router.route("/logout").post(verifyjwt,logoutUser)



export default router