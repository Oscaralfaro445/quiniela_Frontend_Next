import { ReactQueryProvider } from "@/components/shared/reactQueryProvider/ReactQueryProvider";
import { AuthProvider } from "@/context/authContext/AuthContext";
import { AlertProvider } from "@/context/alertContext/AlertContext";
import { Header } from "@/components/shared/header/Header";
import { Footer } from "@/components/shared/footer/Footer";
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
              <Header />
              <main className="min-h-screen pt-18">{children}</main>
              <Footer />
            </AlertProvider>
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
