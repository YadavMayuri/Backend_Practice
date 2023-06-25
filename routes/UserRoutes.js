import express from "express";
import { addToCart, deleteUser, getallusers, getbyId, login, pagination, register, removeProductFromCart, updateUser } from "../controllers/UsersControllers.js";
import { checkpin, registrationChecks } from "../middlewares/authMiddleware.js";
import { OTPregister, otpcjeckforNum, otpcjeckforemail } from "../controllers/OTPcontrollers.js";
import { acregister, regeneratetoken } from "../controllers/accesstokenControllers.js";
import { addproduct, getbyprice } from "../controllers/productsControllers.js";

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
router.post('/addproduct',addproduct)
router.post('/addToCart',addToCart)
router.post('/removeProductFromCart',removeProductFromCart)
router.get('/getbyprice',getbyprice)

















export default router;