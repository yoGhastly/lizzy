"use client";
import { AuthLayout } from "@/app/modules/auth/auth-layout";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <AuthLayout>
      <SignUp />
    </AuthLayout>
  );
}
