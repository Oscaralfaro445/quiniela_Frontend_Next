import Link from "next/link";
import { Button } from "@/components/shared/button/Button";
import { Card } from "@/components/shared/card/Card";
import { Icon } from "@/components/shared/icon/Icon";
import { MainContainer } from "@/components/shared/mainContainer/MainContainer";
import { SectionGrid } from "@/components/shared/sectionGrid/SectionGrid";
import { Title } from "@/components/shared/text/Title";
import { TextBody } from "@/components/shared/text/TextBody";

export default function Home() {
  return (
    <MainContainer>
      <SectionGrid>
        <div className="grid gap-2 justify-items-center items-center">
          <Title title="Predice los Ganadores de la NFL" />
          <TextBody
            className="text-center"
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
      </SectionGrid>

      <SectionGrid className="bg-gray-100">
        <div className="grid gap-4 justify-items-center items-center">
          <h3 className="text-3xl font-bold text-center text-gray-900">
            ¿Por qué elegir NFL Quiniela?
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
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
      </SectionGrid>

      <SectionGrid className="bg-blue-700">
        <div className="grid gap-2 justify-items-center items-center">
          <Title
            className="text-center text-white"
            title="¿Listo para Demostrar tus Conocimientos?"
          />
          <TextBody
            className="text-center text-white"
            text="La temporada está en marcha. No te quedes fuera de la acción"
          />
        </div>

        <div className="flex justify-center items-center">
          <Link href="/register">
            <Button type="button" title="Únete Gratis Ahora" theme="normal" />
          </Link>
        </div>
      </SectionGrid>
    </MainContainer>
  );
}
