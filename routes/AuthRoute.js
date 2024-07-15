import router from 'express';
import {signup, login} from '../controllers/AuthController.js';

const authRouters = router.Router();

authRouters.post('/signup',signup);
authRouters.post('/login',login);

export default authRouters;
