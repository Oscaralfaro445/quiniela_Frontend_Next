import { ReactQueryProvider } from "@/components/shared/reactQueryProvider/ReactQueryProvider";
import { LayoutShell } from "@/components/home/layout/LayoutShell";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>{/*<link rel="" href="" type="" />*/}</head>

      <body className="min-h-screen">
        <ReactQueryProvider>
          <AuthProvider>
            <LayoutShell>{children}</LayoutShell>
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
