import {Router} from 'express'
import { getAllCarts, getProductsFromCart, createCart, addProductToCart, addBatchProducts, modifyQuantity, deleteProductFromCart, emptyCart, finishPurchase} from '../controllers/cart.controller.js'
const router = Router()


router.get('/', getAllCarts)

router.get('/:cid', getProductsFromCart)

router.post('/', createCart)

router.post('/:cid/product/:pid', addProductToCart)

router.put('/:cid', addBatchProducts)

router.put('/:cid/product/:pid', modifyQuantity)

router.delete('/:cid/product/:pid', deleteProductFromCart)

router.delete('/:cid', emptyCart)

router.get('/:cid/purchase', finishPurchase)

export default router