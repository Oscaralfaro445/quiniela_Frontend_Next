import { ReactQueryProvider } from "@/components/shared/reactQueryProvider/ReactQueryProvider";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>{/*<link rel="" href="" type="" />*/}</head>
      <body className="bg-white w-full h-screen">
        <ReactQueryProvider>
          <main>{children}</main>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
