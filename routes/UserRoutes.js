import express from "express";
import { deleteUser, getallusers, getbyId, login, pagination, register, updateUser } from "../controllers/UsersControllers.js";
import { checkpin, registrationChecks } from "../middlewares/authMiddleware.js";
import { OTPregister, otpcjeckforNum, otpcjeckforemail } from "../controllers/OTPcontrollers.js";
import { acregister, regeneratetoken } from "../controllers/accesstokenControllers.js";

const router = express.Router()

router.post('/register',registrationChecks,register)
router.post('/login',login)
router.put('/updateUser',checkpin,updateUser)
router.delete('/deleteUser',checkpin,deleteUser)
router.get('/getallusers',getallusers)
router.get('/getbyId',getbyId)
router.get('/pagination',pagination)
router.post('/OTPregister',OTPregister)
router.post('/otpcjeckforNum',otpcjeckforNum)
router.post('/otpcjeckforemail',otpcjeckforemail)
router.post('/acregister',acregister)
router.post('/regeneratetoken',regeneratetoken)














export default router;