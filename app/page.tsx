import Link from "next/link";
import { Button } from "@/components/shared/button/Button";
import { Card } from "@/components/shared/card/Card";
import { Icon } from "@/components/shared/icon/Icon";
import { Title } from "@/components/shared/text/Title";
import { TextBody } from "@/components/shared/text/TextBody";
import { IconName } from "@/types/icon/icon";

interface CardDetails {
  title: string;
  description: string;
  icon: IconName;
}

export default function HomePage() {
  const cardDetails: CardDetails[] = [
    {
      title: "Competencias semanales",
      description:
        "Participa en quinielas semanales y compite por los primeros lugares con otros fanáticos del NFL.",
      icon: "trophy",
    },
    {
      title: "Estadísticas detalladas",
      description:
        "Accede a estadísticas detalladas de tu rendimiento y mejora tus predicciones semana tras semana",
      icon: "chart-bar",
    },
    {
      title: "Ligas privadas",
      description:
        "Crea ligas privadas con tus amigos y familiares para hacer la experiencia más personal y divertida",
      icon: "users",
    },
  ];

  return (
    <div>
      <section className="w-full pt-18 bg-blue-700">
        <div className="grid max-w-[1280px] mx-auto px-10 py-10 lg:py-32 gap-4">
          <div className="grid gap-4 justify-items-center items-center">
            <Title
              className="text-center text-white"
              title="Predice los ganadores de la NFL"
            />
            <TextBody
              className="text-center text-white"
              text="Únete a la emoción de la temporada NFL. Haz tus predicciones,
            compite con amigos y demuestra que eres el mejor pronosticador."
            />
          </div>

          <div className="flex gap-4 justify-center items-center">
            <Link href="/register">
              <Button type="button" title="Comenzar Ahora" theme="normal" />
            </Link>

            <Link href="/login">
              <Button type="button" title="Iniciar Sesión" />
            </Link>
          </div>
        </div>
      </section>

      <div className="grid max-w-[1280px] mx-auto px-10 py-20 lg:py-32 gap-4">
        <div className="grid gap-4 justify-items-center items-center">
          <Title
            className="text-center"
            title=" ¿Por qué elegir NFL Quiniela?"
          />
          <TextBody
            className="text-center"
            text="Aqui podrás hacer tus predicciones y competir con otros fanáticos."
          />
        </div>

        <div className="grid md:flex gap-4">
          {cardDetails.map((card, index) => (
            <Card key={index}>
              <div className="flex flex-col w-full gap-2 justify-center items-center">
                <Icon name={card.icon} className="text-blue-700" />
                <div className="text-center text-lg font-semibold text-gray-900">
                  {card.title}
                </div>
              </div>

              <div>
                <div className="text-center">{card.description}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <section className="bg-neutral-50">
        <div className="grid max-w-[1280px] mx-auto px-10 py-20 lg:py-32 gap-4">
          <div className="grid gap-2 justify-items-center items-center">
            <Title
              className="text-center"
              title="¿Listo para demostrar tus conocimientos?"
            />
            <TextBody
              className="text-center"
              text="La temporada está en marcha. No te quedes fuera de la acción."
            />
          </div>

          <div className="flex gap-4 justify-center items-center">
            <Link href="/register">
              <Button type="button" title="Únete gratis ahora" theme="normal" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
