import { Router } from "express";
import {verifyjwt} from "../middlewares/Auth.middlewares.js";
import { createDairyPage, deleteDairyPage, getAllDairyPages, updateDairyPage } from "../controllers/dairyPage.controller.js";

const router=Router();

router.use(verifyjwt);
router.route("/:dairyId").get(getAllDairyPages)
router.route("/create-dairy-page/:dairyId").post(createDairyPage)
router.route("/update-dairy-page/:pageId").patch(updateDairyPage)
router.route("/delete-dairy-page/:pageId").delete(deleteDairyPage)

export default router