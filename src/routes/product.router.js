import {Router} from 'express'
import { getAllProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../controllers/product.controller.js'
const router = Router()



router.get('/', getAllProducts)

router.get('/:pid', getProduct)

router.post('/', createProduct)

router.put('/:pid', updateProduct)

router.delete('/:pid', deleteProduct)

export default router