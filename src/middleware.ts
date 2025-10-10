import { jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";
import { UserRole } from "./utils/utils";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  console.log(`Middleware invoked for path: ${path}`);

  const isPublicRoute = path === "/login" || path == "/forgot-password";
  const token = request.cookies.get("token")?.value ?? null;

  if (isPublicRoute) {
    return NextResponse.next();
  }

  if (!token) {
    const loginUrl = new URL("/login", request.url);
    if (path === "/login" || path == "/forgot-password") {
      return NextResponse.next();
    }
    return NextResponse.redirect(loginUrl);
  }

  let decodedToken: JwtPayloadType | null = null;
  try {
    decodedToken = jwtDecode<JwtPayloadType>(token!);
    console.log("Decoded Token:", decodedToken);
    const currentTime = Date.now() / 1000; // in seconds
    const isTokenExpred = decodedToken.exp < currentTime;
    if (isTokenExpred && !isPublicRoute) {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  } catch (error) {
    console.log("Error decoding token:", error);
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }
  const role = decodedToken?.role;

  if(!isPublicRoute){
    if(role === UserRole.ADMIN){
      if(path === "/" || path.startsWith("/stations") || path.startsWith("/shows")){
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
