import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Trung tâm quản lý phim Nhật Lãng",
  description: "Tạo và quản lý bởi Toilatatca Team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">
        {children}
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "18px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "bg-white",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </body>
    </html>
  );
}
