import { Card } from "../shared/card/Card";
import { Icon } from "../shared/icon/Icon";
import { PrescisionCard } from "../ui/statistics/PrecisionCard";
import { RankingCard } from "../ui/statistics/RankingCard";

interface StatisticsCard {
  currentWeek: string;
}

export const StatisticsCard = ({ currentWeek }: StatisticsCard) => {
  return (
    <section>
      <div className="grid lg:flex w-full max-w-[1280px] mx-auto px-10 py-8 gap-4">
        <PrescisionCard />

        <RankingCard />

        <Card>
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-gray-600">
              Semana Actual
            </div>
            <Icon className="text-blue-600" name="calendar" />
          </div>

          <div className="grid gap-1">
            <div className="text-2xl font-bold text-gray-900">
              Semana {currentWeek}
            </div>

            <p className="text-xs text-gray-600">{`${
              18 - Number(currentWeek)
            } semanas pendientes`}</p>
          </div>
        </Card>
      </div>
    </section>
  );
};
