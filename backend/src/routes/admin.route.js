import { Router } from "express";
import { checkAdmin, createAlbum, createSong, deleteAlbum, deleteSong } from "../controllers/admin.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router =  Router();


//slightly optimised 
router.use(protectRoute , requireAdmin);

//check for admin or not to make dashboard visible accordingly 

router.get("/check" ,   checkAdmin);

router.post('/songs' ,  createSong);
router.delete('/songs/:id' ,  deleteSong);



router.post('/albums' ,  createAlbum);
router.delete('/albums/:id' ,  deleteAlbum);


export default router