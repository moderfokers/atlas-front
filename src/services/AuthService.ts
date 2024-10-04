import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { ConfigService } from "./ConfigService";
import { redirect } from "next/navigation";
import { IAuthOutput } from "@/domains/login/core/use-cases/authenticate.server";

class AuthServiceClass {
  private getAuthToken() {
    return cookies().get(ConfigService.getInstance().accessTokenKey || "")
      ?.value;
  }

  public setAuthTokenHeader(xAuth: string | null) {
    ConfigService.load({
      axiosConfig: {
        headers: {
          [ConfigService.getInstance().authHeader || "X-Auth"]: xAuth,
        },
      },
    });
  }

  public isValidToken() {
    // 1. check if there is any token in cookies
    const token = this.getAuthToken();
    if (!token) {
      console.log("There is no token in cookies");
      return false;
    }

    const decoded = jwt.decode(token) as { exp: number } | null;

    // 2. check if jwt could be decoded
    if (!decoded?.exp) {
      console.log("Invalid decode jwt");
      return false;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    const isExpired = decoded.exp < currentTime;

    // 3. check if jwt is expired
    return !isExpired;
  }

  public login(authOutput: IAuthOutput) {
    const { accessToken, user } = authOutput;
    // this.setAuthTokenHeader(`Bearer ${accessToken}`);
    cookies().set(
      ConfigService.getInstance().accessTokenKey || "",
      accessToken
    );

    cookies().set("user", JSON.stringify(user));
    redirect("/hub/home");
  }

  private getUser() {}
}

const AuthService = new AuthServiceClass();

export { AuthService };
