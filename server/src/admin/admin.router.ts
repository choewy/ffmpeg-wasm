import { Router } from "express";
import { AuthCheck } from "../user/user.auth";
import { AdminController } from "./admin.controller";

const AdminRouter = Router();

AdminRouter.get('/users', AuthCheck, AdminController.users);

export default AdminRouter;
