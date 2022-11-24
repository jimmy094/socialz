import express from "express";
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
} from "../controllers/users.js";
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

//Read
//created users route in index, the :id is grabbed from frontend 
//grab user friends
router.get('/:id', verifyToken, getUser);
router.get('/:id/friends', verifyToken, getUserFriends);

//update
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;