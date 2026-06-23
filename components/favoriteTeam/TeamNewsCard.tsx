"use client";

import { useGetFavoriteTeam } from "@/hooks/queries/favoriteTeam/useGetFavoriteTeam";
import { Card } from "../shared/card/Card";
import { Newspaper } from "lucide-react";

export const TeamNewsCard = () => {
  const { isPending, isError, isSuccess, data } = useGetFavoriteTeam();
  const news = data?.data?.[0]?.infNoticias;

  return (
    <Card>
      <div className="grid gap-4">
        <div>
          <p className="text-lg text-blue-600 font-semibold">
            Noticias destacadas de tu equipo favorito
          </p>
        </div>

        {isPending && <p>Cargando...</p>}

        {isError && (
          <p>Error al cargar el último juego de tu equipo favorito.</p>
        )}

        {isSuccess && news ? (
          <div className="w-full max-h-[70vh] overflow-auto rounded-md">
            <table className="w-full">
              <thead className="bg-blue-600 text-white text-sm font-semibold">
                <tr className="">
                  <th className="p-2 border-b border-gray-200 text-left">
                    Fuente
                  </th>
                  <th className="p-2 border-b border-gray-200 text-left">
                    Fechas
                  </th>
                  <th className="p-2 border-b border-gray-200 text-left">
                    Hora
                  </th>
                  <th className="p-2 border-b border-gray-200 text-left">
                    Equipo
                  </th>
                  <th className="p-2 border-b border-gray-200 text-left">
                    Titular
                  </th>
                  <th className="p-2 border-b border-gray-200 text-left">
                    Noticia
                  </th>
                </tr>
              </thead>

              <tbody>
                {news?.map(
                  (
                    noticia: {
                      source: string;
                      publishedDate: string;
                      teamCode: string;
                      headline: string;
                      summary: string;
                      articleUrl: string;
                      playerName: string;
                      category: null;
                    },
                    index: number,
                  ) => {
                    const date = noticia.publishedDate;
                    const [fecha, hora] = date.split("T");

                    return (
                      <tr
                        key={index}
                        className={
                          noticia.category === "1" ? "bg-yellow-400" : ""
                        }
                      >
                        <td className="p-2 border-b border-gray-200">
                          {noticia.source}
                        </td>
                        <td className="p-2 border-b border-gray-200">
                          {fecha}
                        </td>
                        <td className="p-2 border-b border-gray-200">{hora}</td>
                        <td className="p-2 border-b border-gray-200">
                          {noticia.teamCode}
                        </td>
                        <td className="p-2 border-b border-gray-200">
                          {noticia.headline}
                        </td>
                        <td className="p-2 border-b border-gray-200">
                          <a
                            href={noticia.articleUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Newspaper /* className="hover:animate-bounce transition-all" */
                            />
                          </a>
                        </td>
                      </tr>
                    );
                  },
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No hay información disponible.</p>
        )}
      </div>
    </Card>
  );
};
