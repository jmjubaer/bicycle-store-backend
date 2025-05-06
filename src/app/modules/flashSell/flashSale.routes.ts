import { Router } from 'express';
import { FlashSaleController } from './flashSale.controller';
// import auth from '../../middleware/auth';

const router = Router();

router.get('/flashSale', FlashSaleController.getAllFlashSale);

router.post('/flashSale', FlashSaleController.createFlashSale);
router.get('/flashSale/:id', FlashSaleController.getSingleFlashSale);
router.put('/flashSale/:id', FlashSaleController.updateFlashSale);
router.delete('/flashSale/:id', FlashSaleController.deleteFlashSale);

export const flashSaleRoutes = router;
