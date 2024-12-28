export { auth as middleware } from "@/app/auth";

export const config = {
  matcher: ["/memos/:path*", "/account-settings/:path*"],
};
