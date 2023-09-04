import express from 'express'
import cookieParser from 'cookie-parser'

import cors from 'cors'
import { AppDataSource } from './data-source'
import userRouter from './routes/user.route'
import authRouter from './routes/auth.route'
import 'reflect-metadata'
import dotenv from 'dotenv'
// import { User } from './entities/user.entity'

dotenv.config()

AppDataSource.initialize()
  .then(async () => {
    // create express app
    const app = express()

    // cors, bodyParser, cookieParser
    app.use(express.json())
    app.use(
      cors({
        origin: 'http://localhost:3333', // TO put in env
        credentials: true
      })
    )
    app.use(cookieParser())

    // routers
    app.use('/api/user', userRouter)
    app.use('/api/auth', authRouter)

    // start express server
    app.listen(process.env.SERVER_PORT)

    // insert new users for test when no test user
    // const userCount = await AppDataSource.manager.count(User);
    // if (userCount === 0) {
    //   await AppDataSource.manager.save(
    //     AppDataSource.manager.create(User, {
    //       nickName: "Castor",
    //       firstName: "Timber",
    //       lastName: "Saw",
    //       email: "timber@gmail.com",
    //       password:"test1"
    //     })
    //   );

    //   await AppDataSource.manager.save(
    //     AppDataSource.manager.create(User, {
    //       nickName: "Phan",
    //       firstName: "Phantom",
    //       lastName: "Assassin",
    //       email: "phantom@gmail.com",
    //       password:"test1"
    //     })
    //   );
    // }

    console.log(`Express server has started on port ${process.env.SERVER_PORT}`)
  })
  .catch((error) => { console.log(error) })
