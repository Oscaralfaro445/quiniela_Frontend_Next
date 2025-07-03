"use client";

import { ReactQueryProvider } from "@/components/shared/reactQueryProvider/ReactQueryProvider";
import "./globals.css";
import { useState } from "react";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { Header } from "@/components/shared/header/Header";
import { Footer } from "@/components/shared/footer/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <html lang="en">
      <head>{/*<link rel="" href="" type="" />*/}</head>

      <body>
        <ReactQueryProvider>
          <div className="min-h-screen flex flex-col">
            <div className="flex flex-1">
              {isSidebarOpen && (
                <div className="w-1/6 transition-all duration-200">
                  <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar} />
                </div>
              )}

              <div className="flex flex-col flex-1 w-full p-6">
                <Header
                  toggleSidebar={toggleSidebar}
                  isSidebarOpen={isSidebarOpen}
                />

                <main className="flex-1 py-6">{children}</main>

                <Footer />
              </div>
            </div>
          </div>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
