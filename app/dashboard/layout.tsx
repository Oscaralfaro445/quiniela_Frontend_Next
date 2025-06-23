"use client";
import { useState } from "react";
import useGetProfileData from "@/hooks/profileData/useGetProfileData";
import { Footer } from "@/components/shared/footer/Footer";
import { Header } from "@/components/shared/header/Header";
import { Sidebar } from "@/components/sidebar/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { isSuccess, isPending, isError, data, error } = useGetProfileData();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen flex flex-col">
      {isPending && (
        <div className="flex flex-1 w-full overflow-hidden">
          <div
            className={`transition-all duration-200 ${
              isSidebarOpen ? "w-1/6" : "w-0"
            }`}
          >
            <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar} />
          </div>

          <div className="flex flex-col flex-1 w-full">
            <Header
              toggleSidebar={toggleSidebar}
              isSidebarOpen={isSidebarOpen}
              profileData={data}
            />
            <main className="flex-1 overflow-y-auto">{children}</main>
            <Footer />
          </div>
        </div>
      )}

      {isError && (
        <div>
          <h1>Error en el dashboard</h1>
        </div>
      )}

      {isSuccess && (
        <div className="flex flex-1 w-full">
          <div
            className={`transition-all duration-200 ${
              isSidebarOpen ? "w-1/6" : "w-0"
            }`}
          >
            <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar} />
          </div>

          <div className="flex flex-col flex-1 w-full">
            <Header
              toggleSidebar={toggleSidebar}
              isSidebarOpen={isSidebarOpen}
              profileData={data}
            />

            <main className="flex-1">{children}</main>

            <Footer />
          </div>
        </div>
      )}
    </div>
  );
}
