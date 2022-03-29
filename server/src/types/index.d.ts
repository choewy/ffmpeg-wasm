import { UserSign } from "../user/user.entities";
declare global {
  namespace Express {
    interface Request {
      user?: UserSign;
      token?: string;
    }
  }
}