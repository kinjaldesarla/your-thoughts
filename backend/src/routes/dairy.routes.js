import { Router } from "express";
import {verifyjwt} from "../middlewares/Auth.middlewares.js";
import { createDairy, deleteDairy, getAllDairy } from "../controllers/dairy.controllers.js";

const router=Router();

router.use(verifyjwt);
router.route("/").get(getAllDairy)
router.route("/create-dairy").post(createDairy)
router.route("/delete-dairy/:dairyId").delete(deleteDairy)
 
export default router 