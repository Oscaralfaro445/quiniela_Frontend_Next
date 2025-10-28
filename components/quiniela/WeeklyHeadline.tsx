import { TextBody } from "../shared/text/TextBody";
import { Title } from "../shared/text/Title";

interface WeeklyHeadlineProps {
  week: string | undefined;
}

export const WeeklyHeadline = ({ week }: WeeklyHeadlineProps) => {
  return (
    <section className="pt-18">
      <div className="max-w-[1280px] mx-auto px-10 py-8">
        <div className="grid md:flex w-full gap-4 justify-center md:justify-between items-center">
          <div className="grid gap-2">
            <Title
              className="text-center"
              title={`Semana ${week} - Quiniela`}
            />
            <TextBody
              className="text-center"
              text="Selecciona el ganador de cada juego"
            />
          </div>

          <div className="flex justify-center items-center border-2 border-blue-600 rounded-2xl">
            <p className="px-2 py-1 text-sm font-semibold text-blue-700">
              NFL temporada 2025
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
