import { TextBody } from "../shared/text/TextBody";
import { Title } from "../shared/text/Title";

interface WeeklyHeadlineProps {
  week: string | undefined;
}

export const WeeklyHeadline = ({ week }: WeeklyHeadlineProps) => {
  return (
    <div className="flex w-full justify-between items-center">
      <div className="grid gap-2">
        <Title title={`Semana ${week} - Quiniela`} />
        <TextBody text="Selecciona el ganador de cada juego" />
      </div>

      <div className="flex justify-center items-center border-2 border-blue-600 rounded-2xl">
        <p className="px-2 py-1 text-sm font-semibold text-blue-700">
          NFL temporada 2025
        </p>
      </div>
    </div>
  );
};
