"use client";
import React, { type PropsWithChildren } from "react";
import { Footer } from "@/app/modules/common/layout/footer";
import { Testimonials } from "../common/components/testimonials";

export const AuthLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <React.Fragment>
      <div className="w-full mx-auto flex flex-col md:flex-row gap-12 items-center justify-center h-dvh">
        <Testimonials className="hidden md:flex" />
        {children}
      </div>
      <Footer hideSeeCatalogueButton />
    </React.Fragment>
  );
};
