import { Router } from "express";
import { AuthCheck } from "./user.auth";
import { UserController } from "./user.controller";

const UserRouter = Router();

UserRouter.get('/', AuthCheck, UserController.auth);
UserRouter.post('/signup', UserController.signUp);
UserRouter.post('/signin', UserController.signIn);
UserRouter.delete('/signout', AuthCheck, UserController.signOut);

export default UserRouter;