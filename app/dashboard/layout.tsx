"use client";
import { useState } from "react";
import { Footer } from "@/components/shared/footer/Footer";
import { Header } from "@/components/shared/header/Header";
import { Sidebar } from "@/components/sidebar/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen overflow-hidden">
      <div
        className={`transition-all duration-200 ${
          isSidebarOpen ? "w-1/6" : "w-0"
        }`}
      >
        <Sidebar
          currentRoute="/login"
          isOpen={isSidebarOpen}
          toggle={toggleSidebar}
        />
      </div>

      <div className="flex flex-col flex-1">
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <main className="flex-1 overflow-y-auto">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
