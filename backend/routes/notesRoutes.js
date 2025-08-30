import { Router } from "express";
import { CreateNotes, DeleteNotes, getAllNotes, PutNotes, getNoteById } from "../controllers/notesController.js";

const router = Router();

router.get("/", getAllNotes);
router.post("/", CreateNotes);
router.put("/:id", PutNotes);
router.delete("/:id", DeleteNotes);
router.get("/:id", getNoteById);

export default router;
