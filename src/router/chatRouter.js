
import express from "express";

import { chatResponse, listModels } from "../controller/chatGptController.js";

const router = express.Router();

router.get("/messageResponse", chatResponse);
router.get("/listModels", listModels);

export default router;
