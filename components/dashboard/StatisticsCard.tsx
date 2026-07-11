import { useGetMe } from "@/hooks/queries/user/useGetMe";
import { Card } from "../shared/card/Card";
import { Icon } from "../shared/icon/Icon";
import { PrescisionCard } from "./statistics/PrecisionCard";
import { RankingCard } from "./statistics/RankingCard";

export const StatisticsCard = () => {
  const { data } = useGetMe();
  const user = data?.data?.[0];
  const week = user?.idPeriodo;

  return (
    <section className="grid lg:flex gap-4">
      <PrescisionCard />

      <RankingCard />

      <Card>
        <div className="flex items-center justify-between">
          <p className="text-md font-medium text-neutral-600">Semana actual</p>
          <Icon className="text-blue-600" name="calendar" />
        </div>

        <div className="grid gap-1">
          <p className="text-2xl font-bold text-neutral-700">Semana {week}</p>

          <p className="text-xs text-blue-600">{`${
            18 - Number(week)
          } semanas restantes`}</p>
        </div>
      </Card>
    </section>
  );
};
