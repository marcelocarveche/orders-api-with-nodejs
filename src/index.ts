import express from 'express'
import mongoose from 'mongoose'
import path from 'node:path'
import { router } from './app/routes/router'

mongoose.connect('mongodb://localhost:27017')
  .then(() => {
    console.log('✅ conectado ao mongo')

    const app = express()
    const port = 8081

    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))

    app.use(express.json())
    app.use(router)


    app.listen(port, () => {
      console.log(`🚀 Server is running on http://localhost:${port}`)
    })
  })
  .catch(() => console.log('⚠️ erro ao conectar no mongodb'))
