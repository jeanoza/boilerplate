import express, { Request, Response } from "express";
import cors from "cors";
import { AppDataSource } from "./data-source";
import userRouter from "./routes/user.route";
import { User } from "./entities/user.entity";
import "reflect-metadata";

AppDataSource.initialize()
  .then(async () => {
    // create express app
    const app = express();

    // cors, bodyParser
    app.use(express.json());
    app.use(cors());

    //routers
    app.use("/api/user", userRouter);

    // start express server
    app.listen(process.env.SERVER_PORT);

    // insert new users for test when no test user
    // const userCount = await AppDataSource.manager.count(User);
    // if (userCount === 0) {
    //   await AppDataSource.manager.save(
    //     AppDataSource.manager.create(User, {
    //       nickName: "Castor",
    //       firstName: "Timber",
    //       lastName: "Saw",
    //       email: "timber@gmail.com",
    //     })
    //   );

    //   await AppDataSource.manager.save(
    //     AppDataSource.manager.create(User, {
    //       nickName: "Phan",
    //       firstName: "Phantom",
    //       lastName: "Assassin",
    //       email: "phantom@gmail.com",
    //     })
    //   );
    // }

    console.log(
      `Express server has started on port ${process.env.SERVER_PORT}`
    );
  })
  .catch((error) => console.log(error));
