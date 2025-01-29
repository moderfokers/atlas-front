import { redirect } from "next/navigation";

class NavigationServiceClass {
  public redirect(path: string) {
    if (window?.location !== undefined) {
      // is client
      window.location.href = `${window.location.origin}${path}`;
      return;
    }

    // is server
    redirect(path);
  }
}

const NavigationService = new NavigationServiceClass();

export { NavigationService };
