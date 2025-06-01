import { ReactQueryProvider } from "@/components/shared/reactQueryProvider/ReactQueryProvider";
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
      <body className="">
        <ReactQueryProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
