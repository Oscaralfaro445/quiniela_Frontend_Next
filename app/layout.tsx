import { ReactQueryProvider } from "@/components/ui/reactQueryProvider/ReactQueryProvider";
import { AlertProvider } from "@/context/alert/AlertContext";
import { Header } from "@/components/ui/header/Header";
import { Footer } from "@/components/ui/footer/Footer";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Quiniela - Predicciones Deportivas</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Plataforma de quinielas deportivas. Haz tus predicciones, compite con otros usuarios y gana premios en cada temporada."
        />
        <meta
          name="keywords"
          content="quiniela, predicciones deportivas, apuestas, football, NFL, competencia, premios, temporada"
        />
        <meta name="author" content="Oscar Alfaro" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="Spanish" />
        <meta name="revisit-after" content="7 days" />
      </head>

      <body>
        <ReactQueryProvider>
          <AlertProvider>
            <Header />
            <main className="grid min-h-screen pt-16 bg-neutral-50">
              {children}
            </main>
            <Footer />
          </AlertProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
