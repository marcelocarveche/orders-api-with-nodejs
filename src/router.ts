import path from 'node:path'

import { Router } from 'express'
import multer from 'multer'

import { createCategory } from './app/usecases/categories/create-category'
import { listCategories } from './app/usecases/categories/list-categories'
import { createProduct } from './app/usecases/products/create-product'
import { listProducts } from './app/usecases/products/list-products'
import { listProductsByCategory } from './app/usecases/categories/list-products-by-category'
import { listOrders } from './app/usecases/orders/list-orders'
import { createOrders } from './app/usecases/orders/create-order'
import { changeOrderStatus } from './app/usecases/orders/change-order-status'
import { cancelOrder } from './app/usecases/orders/cancel-order'

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

// List categories
router.get('/categories', listCategories)

// Create category
router.post('/category', createCategory)

// List products
router.get('/products',listProducts)

// Create product
router.post('/product', upload.single('image'),  createProduct)

// Get products by category
router.get('/categories/:categoryId/products', listProductsByCategory)

// List orders
router.get('/orders', listOrders)

// Create Order
router.post('/orders', createOrders)

// Change order status
router.patch('/orders/:orderId', changeOrderStatus)

// Delete/cancel order
router.delete('/orders/:orderId', cancelOrder)