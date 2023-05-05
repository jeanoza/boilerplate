import express, { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import userRouter from "./routes/user.route";
import { User } from "./entities/user";
import "reflect-metadata";

AppDataSource.initialize()
  .then(async () => {
    // create express app
    const app = express();

    app.use(express.json());

    //routers
    app.use("/api/user", userRouter);

    // setup express app here
    // ...

    // start express server
    app.listen(process.env.SERVER_PORT);

    // insert new users for test when no test user
    const userCount = await AppDataSource.manager.count(User);
    if (userCount === 0) {
      await AppDataSource.manager.save(
        AppDataSource.manager.create(User, {
          firstName: "Timber",
          lastName: "Saw",
          age: 27,
          email: "timber@gmail.com",
        })
      );

      await AppDataSource.manager.save(
        AppDataSource.manager.create(User, {
          firstName: "Phantom",
          lastName: "Assassin",
          age: 24,
          email: "phantom@gmail.com",
        })
      );
    }

    console.log(
      `Express server has started on port ${process.env.SERVER_PORT}`
    );
  })
  .catch((error) => console.log(error));
