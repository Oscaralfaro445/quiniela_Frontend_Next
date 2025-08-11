import Link from "next/link";
import { Button } from "@/components/shared/button/Button";
import { Card } from "@/components/shared/card/Card";
import { CardHeader } from "@/components/shared/cardHeader/CardHeader";
import { Icon } from "@/components/shared/icon/Icon";
import { CardTitle } from "@/components/shared/cardTitle/CardTitle";
import { CardContent } from "@/components/shared/cardContent/CardContent";
import { CardDescription } from "@/components/shared/cardDescription/CardDescription";
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
            text="Únete a la emoción de la temporada NFL. Haz tus predicciones,
            compite con amigos y demuestra que eres el mejor pronosticador."
          />
        </div>

        <div className="flex gap-4 justify-center items-center">
          <Link href="/register">
            <Button type="button" title="Comenzar Ahora" />
          </Link>

          <Link href="/register">
            <Button type="button" title="Como Funciona" theme="normal" />
          </Link>
        </div>
      </SectionGrid>

      <SectionGrid className="bg-gray-100">
        <div className="grid gap-4 justify-center items-center">
          <h3 className="text-3xl font-bold text-center text-gray-900">
            ¿Por qué elegir NFL Quiniela?
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-gray-200">
              <CardHeader className="text-center">
                <Icon name="trophy" />
                <CardTitle className="text-gray-900">
                  Competencias Semanales
                </CardTitle>
              </CardHeader>

              <CardContent>
                <CardDescription className="text-center">
                  Participa en quinielas semanales y compite por los primeros
                  lugares con otros fanáticos del NFL.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardHeader className="text-center">
                <Icon name="users" />
                <CardTitle className="text-gray-900">Ligas Privadas</CardTitle>
              </CardHeader>

              <CardContent>
                <CardDescription className="text-center">
                  Crea ligas privadas con tus amigos y familiares para hacer la
                  experiencia más personal y divertida.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardHeader className="text-center">
                <Icon name="trending-up" />
                <CardTitle className="text-gray-900">
                  Estadísticas Detalladas
                </CardTitle>
              </CardHeader>

              <CardContent>
                <CardDescription className="text-center">
                  Accede a estadísticas detalladas de tu rendimiento y mejora
                  tus predicciones semana tras semana.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </SectionGrid>

      <SectionGrid className="bg-blue-700">
        <div className="grid gap-2 justify-items-center items-center">
          <Title
            className="text-white"
            title="¿Listo para Demostrar tus Conocimientos?"
          />
          <TextBody
            className="text-white"
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
