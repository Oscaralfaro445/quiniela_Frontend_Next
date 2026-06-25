import { useGetNews } from "@/hooks/queries/news/useGetNews";
import { Card } from "../card/Card";
import { Newspaper } from "lucide-react";

export const NewsCard = () => {
  const { isPending, isError, isSuccess, data } = useGetNews();
  const news = data?.data?.[0];

  return (
    <div className="grid gap-4">
      <p className="text-center text-2xl font-bold text-blue-600">
        Noticias NFL
      </p>
      <Card>
        <div className="grid gap-4">
          <div>
            <p className="text-lg font-semibold">
              Consulta las noticias destacadas de la NFL
            </p>
          </div>

          {isPending && <p>Cargando...</p>}

          {isError && (
            <p>Error al cargar el último juego de tu equipo favorito.</p>
          )}

          {isSuccess && news ? (
            <div className="w-full max-h-[55vh] overflow-auto rounded-md">
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
                  {news?.map((noticia, index: number) => {
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
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No hay información disponible.</p>
          )}
        </div>
      </Card>
    </div>
  );
};
