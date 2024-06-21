"use client";

import { AccountLayout } from "@/app/modules/auth/account/account-layout";
import { UserProfile } from "@clerk/nextjs";

export default function AccountPage() {
  return (
    <AccountLayout>
      <UserProfile />
    </AccountLayout>
  );
}
