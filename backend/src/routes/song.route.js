import { Router } from "express";
import { getAllSongs, getFeaturedSongs, getMadeForYouSongs, getTrendingSongs } from "../controllers/song.controller.js";
import { protectRoute , requireAdmin } from "../middleware/auth.middleware.js"
const router =  Router();

router.get('/' ,  protectRoute , requireAdmin , getAllSongs);
//for admin it is necessary to view all the songs from newest to oldest


router.get('/featured' , getFeaturedSongs);

router.get('/made-for-you' , getMadeForYouSongs);

router.get('/trending' , getTrendingSongs);


export default router