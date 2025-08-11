"use client";

import { useState } from "react";
import { Sidebar } from "@/components/shared/sidebar/Sidebar";
import { Header } from "@/components/shared/header/Header";
import { Footer } from "@/components/shared/footer/Footer";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen gap-4 p-4 bg-neutral-100">
      {isSidebarOpen && (
        <div className="hidden lg:block w-2/11">
          <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar} />
        </div>
      )}

      <div className="flex flex-col w-full gap-4">
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

        <main className="bg-white h-full rounded-sm shadow-md">{children}</main>

        <Footer />
      </div>
    </div>
  );
}
