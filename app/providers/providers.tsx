import { ClerkProvider } from "@clerk/nextjs";
import { NextUIProvider } from "@nextui-org/system";
import { CookiesProvider } from "next-client-cookies/server";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <NextUIProvider>
        <CookiesProvider>{children}</CookiesProvider>
      </NextUIProvider>
    </ClerkProvider>
  );
}
