import { ReactQueryProvider } from "@/components/shared/reactQueryProvider/ReactQueryProvider";
import { LayoutShell } from "@/components/layout/LayoutShell";
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
          <LayoutShell>{children}</LayoutShell>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
