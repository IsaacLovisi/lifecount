import {Router} from 'express';
import { getCircles } from '../../controllers/get-circles/get-circles.js';

const router = Router();

router.get('/', getCircles);

export default router;



