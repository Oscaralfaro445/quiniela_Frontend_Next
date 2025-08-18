import Link from "next/link";
import { Button } from "@/components/shared/button/Button";
import { Card } from "@/components/shared/card/Card";
import { Icon } from "@/components/shared/icon/Icon";
import { Title } from "@/components/shared/text/Title";
import { TextBody } from "@/components/shared/text/TextBody";

export default function Home() {
  return (
    <>
      <section className="w-full py-20 lg:py-32 bg-blue-700">
        <div className="grid max-w-[1280px] mx-auto px-10 gap-4">
          <div className="grid gap-2 justify-items-center items-center">
            <Title
              className="text-center text-white"
              title="Predice los Ganadores de la NFL"
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

      <section className="w-full py-20 lg:py-32">
        <div className="grid max-w-[1280px] mx-auto px-10 gap-4">
          <div className="grid gap-2 justify-items-center items-center">
            <Title
              className="text-center"
              title=" ¿Por qué elegir NFL Quiniela?"
            />
            <TextBody
              className="text-center"
              text="Aqui podrás hacer tus predicciones y competir con otros fanáticos."
            />
          </div>

          <div className="grid md:flex gap-8">
            <Card>
              <div className="flex flex-col w-full gap-2 justify-center items-center">
                <Icon name="trophy" className="text-blue-700" />
                <div className="text-center text-lg font-semibold text-gray-900">
                  Competencias Semanales
                </div>
              </div>

              <div>
                <div className="text-center">
                  Participa en quinielas semanales y compite por los primeros
                  lugares con otros fanáticos del NFL.
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex flex-col w-full gap-2 justify-center items-center">
                <Icon name="trophy" className="text-blue-700" />
                <div className="text-center text-lg font-semibold text-gray-900">
                  Estadísticas Detalladas
                </div>
              </div>

              <div>
                <div className="text-center">
                  Accede a estadísticas detalladas de tu rendimiento y mejora
                  tus predicciones semana tras semana
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex flex-col w-full gap-2 justify-center items-center">
                <Icon name="trophy" className="text-blue-700" />
                <div className="text-center text-lg font-semibold text-gray-900">
                  Ligas Privadas
                </div>
              </div>

              <div>
                <div className="text-center">
                  Crea ligas privadas con tus amigos y familiares para hacer la
                  experiencia más personal y divertida
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="w-full py-20 lg:py-32 bg-neutral-50">
        <div className="grid max-w-[1280px] mx-auto px-10 gap-4">
          <div className="grid gap-2 justify-items-center items-center">
            <Title
              className="text-center"
              title="¿Listo para Demostrar tus Conocimientos?"
            />
            <TextBody
              className="text-center"
              text="La temporada está en marcha. No te quedes fuera de la acción."
            />
          </div>

          <div className="flex gap-4 justify-center items-center">
            <Link href="/register">
              <Button type="button" title="Únete Gratis Ahora" theme="normal" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
