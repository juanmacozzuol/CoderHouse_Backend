import {Router} from 'express'
import { getAllCarts, getProductsFromCart, createCart, addProductToCart, addBatchProcuts, modifyQuantity, deleteProductFromCart, emptyCart} from '../controllers/cart.controller.js'
const router = Router()


router.get('/', getAllCarts)

router.get('/:cid', getProductsFromCart)

router.post('/', createCart)

router.post('/:cid/product/:pid', addProductToCart)

router.put('/:cid', addBatchProcuts)

router.put('/:cid/product/:pid', modifyQuantity)

router.delete('/:cid/product/:pid', deleteProductFromCart)

router.delete('/:cid', emptyCart)


export default router