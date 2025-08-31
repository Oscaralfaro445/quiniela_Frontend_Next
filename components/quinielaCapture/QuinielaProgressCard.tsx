import { Card } from "../shared/card/Card";

interface QuinielaProgressCardProps {
  completedPicks: number;
  totalGames: number;
}

export const QuinielaProgressCard = ({
  completedPicks,
  totalGames,
}: QuinielaProgressCardProps) => {
  return (
    <>
      <section>
        <div className="max-w-[1280px] mx-auto px-10 py-8">
          <Card>
            <div className="flex flex-col">
              <span className="text-lg text-blue-700 font-semibold">
                Progreso de la Quiniela
              </span>

              <div className="flex justify-between">
                <span className=" text-sm  text-gray-600">
                  Partidos completados de la semana
                </span>

                <span className="text-sm">{`${completedPicks}/${totalGames} juegos`}</span>
              </div>
            </div>

            <progress
              className="w-full"
              max={totalGames}
              value={completedPicks}
            />
          </Card>
        </div>
      </section>
    </>
  );
};
