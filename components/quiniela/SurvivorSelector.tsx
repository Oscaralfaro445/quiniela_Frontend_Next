import { useGetSurvivorTeams } from "@/hooks/queries/useGetSurvivorTeams";
import { InputCombo } from "../shared/input/inputs/InputCombo";
import { Card } from "../shared/card/Card";
import { Icon } from "../shared/icon/Icon";

interface SurvivorSelectorProps {
  disabled: boolean;
  selectedSurvivor: number;
  value: string;
  handleSelectedSurvivor: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const SurvivorSelector = ({
  disabled,
  selectedSurvivor,
  value,
  handleSelectedSurvivor,
}: SurvivorSelectorProps) => {
  const { isPending, isError, data, error } = useGetSurvivorTeams();

  return (
    <Card>
      <div className="flex w-full items-center justify-between">
        <p className="text-lg font-semibold">Selección survivor</p>
        <Icon className="text-blue-600" name="shield-check" strokeWidth={2} />
      </div>

      {isPending && <p>Loading...</p>}

      {isError && <p>Error: {error?.message}</p>}

      <div>
        <p className="text-base text-gray-600">
          Elige un equipo que creas que ganará esta semana. Solo puedes usar
          cada equipo una vez por temporada.
        </p>

        <InputCombo
          name="survivor"
          data={data?.data}
          selected={selectedSurvivor}
          value={value}
          disabled={disabled}
          onChange={handleSelectedSurvivor}
        />
      </div>
    </Card>
  );
};
