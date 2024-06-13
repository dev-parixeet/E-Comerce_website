import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const protectedRoutes = ["/chekout"];
  const allreadyLogin = ["/login"];

  const url = request.nextUrl.clone();

  let isLogin = request.cookies.get("token");
  //   console.log(isLogin, "");

  if (
    !isLogin &&
    protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (
    isLogin &&
    allreadyLogin.some((route) => request.nextUrl.pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}
