import path from 'node:path'
import { Router } from 'express'
import multer from 'multer'
import { cancelOrder, createCategory, createOrders, createProduct, listCategories, listOrders, listProducts, listProductsByCategory } from '../../app/usecases'
import { Routes } from './routes'
import { changeOrderStatus } from '../../app/usecases/orders/change-order-status'

export const router = Router()

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback){
      callback(null, path.resolve(__dirname, '..', 'uploads'))
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`)
    }
  })
})


router.get(Routes.listCategories, listCategories)
router.post(Routes.createCategory, createCategory)
router.get(Routes.listProducts,listProducts)
router.post(Routes.createProduct, upload.single('image'),  createProduct)
router.get(Routes.getProductsByCategory, listProductsByCategory)
router.get(Routes.listOrders, listOrders)
router.post(Routes.createOrder, createOrders)
router.patch(Routes.changeOrderStatus, changeOrderStatus)
router.delete(Routes.cancelOrder, cancelOrder)