import { AuthLayout } from "@/app/modules/auth/auth-layout";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <AuthLayout>
      <SignIn forceRedirectUrl="/mi-cuenta" />
    </AuthLayout>
  );
}
