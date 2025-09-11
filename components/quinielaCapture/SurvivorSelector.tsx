import { useGetSurvivorTeams } from "@/hooks/survivor/queries/useGetSurvivorTeams";
import { InputCombo } from "../shared/input/inputs/InputCombo";
import { Card } from "../shared/card/Card";
import { Icon } from "../shared/icon/Icon";

interface SurvivorSelectorProps {
  disabled: boolean;
  selectedSurvivor: number;
  handleSelectedSurvivor: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const SurvivorSelector = ({
  disabled,
  selectedSurvivor,
  handleSelectedSurvivor,
}: SurvivorSelectorProps) => {
  const { isPending, isError, isSuccess, error, data } = useGetSurvivorTeams();

  return (
    <section>
      <div className="max-w-[1280px] mx-auto px-10 py-8">
        <Card>
          <div className="flex w-full items-center justify-between">
            <p className="text-lg font-semibold">Selección survivor</p>
            <Icon
              className="text-blue-600"
              name="shield-check"
              strokeWidth={2}
            />
          </div>

          {isPending && <>Loading...</>}

          {isError && <>Error: {error?.message}</>}

          {isSuccess && (
            <>
              <p className="text-base text-gray-600">
                Elige un equipo que creas que ganará esta semana. Solo puedes
                usar cada equipo una vez por temporada.
              </p>
              <InputCombo
                name="survivor"
                data={data.data}
                value={selectedSurvivor}
                disabled={disabled}
                onChange={handleSelectedSurvivor}
              />
            </>
          )}
        </Card>
      </div>
    </section>
  );
};
