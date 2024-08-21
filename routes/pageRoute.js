import express from 'express';
import * as pageController from '../controllers/pageController.js';
import * as autMiddleware from '../middlewares/authMiddleware.js';


const router = express.Router();

router.route('/').get(autMiddleware.authenticateToken,pageController.getIndexPage);
router.route('/about').get(pageController.getAboutPage);
router.route('/register').get(pageController.getRegisterPage);
router.route('/login').get(pageController.getLoginPage);
export default router;