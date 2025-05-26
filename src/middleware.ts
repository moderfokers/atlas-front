import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { init } from "./services/init";
import { AuthService } from "./services/AuthService";
import { ConfigService } from "./services/ConfigService";

const preloadServices = async () => {
  const areServicesInitialized = Boolean(
    Object.keys(global.___ATLAS_CONFIG___ || {}).length
  );
  if (areServicesInitialized) return;

  await init();
};

export async function middleware(request: NextRequest) {
  // console.log("=====");
  // console.log("Middleware entrypoint");
  let response;
  await preloadServices();

  // from /hub -> /login (invalid session_id)
  if (
    request.nextUrl.pathname.startsWith("/hub") &&
    !AuthService.isValidToken()
  ) {
    response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete(ConfigService.getInstance().accessTokenKey || "");
  }

  // from /login -> /hub (already session_id)
  if (
    request.nextUrl.pathname.startsWith("/login") &&
    AuthService.isValidToken()
  ) {
    response = NextResponse.redirect(new URL("/hub/requests", request.url));
  }

  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/:path*",
};
