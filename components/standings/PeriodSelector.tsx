import { useGetAvailablePeriods } from "@/hooks/availablePerios/queries/useGetAvailablePeriods";
import { Card } from "../shared/card/Card";
import { InputCombo } from "../shared/input/inputs/InputCombo";
import { Icon } from "../shared/icon/Icon";

interface PeriodSelectorProps {
  period: number;
  setPeriod: (period: number) => void;
}

export const PeriodSelector = ({ period, setPeriod }: PeriodSelectorProps) => {
  const { isPending, isError, data, error } = useGetAvailablePeriods();
  const periods = data?.data;

  const handleChangePeriod = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPeriod(Number(event?.target.value));
  };

  return (
    <Card>
      <div className="flex w-full items-center justify-between">
        <p className="text-lg font-semibold">Selección de periodo</p>
        <Icon className="text-blue-600" name="shield-check" strokeWidth={2} />
      </div>

      {isPending && <p>Loading...</p>}

      {isError && <p>Error: {error?.message}</p>}

      <div>
        <p className="text-base text-gray-600">
          Selecciona el periodo para consultar al quiniela registrada por
          participante.
        </p>

        <InputCombo
          name="period"
          data={periods}
          selected={period}
          value={" "}
          onChange={handleChangePeriod}
        />
      </div>
    </Card>
  );
};
