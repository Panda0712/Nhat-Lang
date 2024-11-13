import { cn } from "@/lib/utils";
import React from "react";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label: string;
}

const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1 className={cn("text-2xl font-semibold", font.className)}>
        🔐 Đăng nhập/ Đăng ký
      </h1>
      <p className="text-muted-foreground text-lg">{label}</p>
    </div>
  );
};

export default Header;
