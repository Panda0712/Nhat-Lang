import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import React from "react";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen px-4 flex flex-col justify-between">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Provider;
