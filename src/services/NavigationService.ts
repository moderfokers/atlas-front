import { isClientSide } from "@/lib/utils";
import { set } from "date-fns";
import { redirect } from "next/navigation";

class NavigationServiceClass {
  private serverRedirect = (path: string) => {
    redirect(path);
  };

  private clientRedirect = (path: string) => {
    window.location.href = `${window.location.origin}${path}`;
  };

  public redirect(path: string, timeout = 0) {
    setTimeout(() => {
      if (isClientSide()) this.clientRedirect(path);
      else this.serverRedirect(path);
    }, timeout);
  }
}

const NavigationService = new NavigationServiceClass();

export { NavigationService };
