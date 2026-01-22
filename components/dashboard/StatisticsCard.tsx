import { useGetMe } from "@/hooks/getMe/queries/useGetMe";
import { DataUser } from "@/types/user/dataUser";
import { Card } from "../shared/card/Card";
import { Icon } from "../shared/icon/Icon";
import { PrescisionCard } from "./statistics/PrecisionCard";
import { RankingCard } from "./statistics/RankingCard";

export const StatisticsCard = () => {
  const { data: user } = useGetMe();
  const userInfo: DataUser = user?.data?.[0];
  const currentWeek = userInfo?.idPeriodo;

  return (
    <section className="grid lg:flex w-full max-w-[1280px] mx-auto px-10 py-8 gap-4">
      <PrescisionCard />

      <RankingCard />

      <Card>
        <div className="flex items-center justify-between">
          <p className="text-md font-medium text-neutral-600">Semana actual</p>
          <Icon className="text-blue-600" name="calendar" />
        </div>

        <div className="grid gap-1">
          <p className="text-2xl font-bold text-neutral-700">
            Semana {currentWeek}
          </p>

          <p className="text-xs text-blue-600">{`${
            18 - Number(currentWeek)
          } semanas restantes`}</p>
        </div>
      </Card>
    </section>
  );
};
