import { ReactQueryProvider } from "@/components/shared/reactQueryProvider/ReactQueryProvider";
import { LayoutShell } from "@/components/home/layout/LayoutShell";
import { AuthProvider } from "@/context/authContext/AuthContext";
import AlertProvider from "@/context/alertContext/AlertContext";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>{/*<link rel="" href="" type="" />*/}</head>

      <body>
        <ReactQueryProvider>
          <AuthProvider>
            <AlertProvider>
              <LayoutShell>{children}</LayoutShell>
            </AlertProvider>
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
