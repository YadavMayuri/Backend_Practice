import express from "express";
import { deleteUser, getallusers, getbyId, login, pagination, register, updateUser } from "../controllers/UsersControllers.js";
import { checkpin, registrationChecks } from "../middlewares/authMiddleware.js";

const router = express.Router()

router.post('/register',registrationChecks,register)
router.post('/login',login)
router.put('/updateUser',checkpin,updateUser)
router.delete('/deleteUser',checkpin,deleteUser)
router.get('/getallusers',getallusers)
router.get('/getbyId',getbyId)
router.get('/pagination',pagination)









export default router;