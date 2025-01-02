import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: { isOAuthUser: boolean } & User & AdapterUser;
  }
}
