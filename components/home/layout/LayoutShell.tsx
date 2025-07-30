"use client";

import { useState } from "react";
import { Sidebar } from "@/components/shared/ui/sidebar/Sidebar";
import { Header } from "@/components/shared/header/Header";
import { Footer } from "@/components/shared/footer/Footer";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex flex-1 gap-4 p-4 bg-gray-100">
      {isSidebarOpen && (
        <div className="w-2/11 transition-all duration-200">
          <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar} />
        </div>
      )}

      <div className="flex flex-col flex-1 gap-4">
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

        <main className="flex-1 bg-white rounded-sm shadow-md">{children}</main>

        <Footer />
      </div>
    </div>
  );
}
