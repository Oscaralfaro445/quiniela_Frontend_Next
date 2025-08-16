import { SurvivorTeam } from "@/types/survivor/survivorTeam";
import { Card } from "../shared/card/Card";
import { Icon } from "../shared/icon/Icon";
import { InputCombo } from "../shared/input/inputs/InputCombo";

interface SurvivorProps {
  disabled: boolean;
  survivorData: SurvivorTeam[];
  selectedSurvivor: number;
  handleChangeSurvivor: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Survivor = ({
  disabled,
  survivorData,
  selectedSurvivor,
  handleChangeSurvivor,
}: SurvivorProps) => {
  return (
    <Card>
      <div className="flex w-full items-center justify-between">
        <p className="text-lg font-semibold">Selección survivor</p>
        <Icon name="shield-check" color="#1D4ED8" strokeWidth={2} />
      </div>

      <div className="flex w-full items-center justify-start">
        <p className="text-base text-gray-600">
          Elige un equipo que creas que ganará esta semana. Solo puedes usar
          cada equipo una vez por temporada.
        </p>
      </div>

      <div className="flex w-full items-center">
        <InputCombo
          name="survivor"
          data={survivorData || []}
          value={selectedSurvivor}
          disabled={disabled}
          onChange={handleChangeSurvivor}
          optionValueKey="llave"
          optionLabelKey="valor"
        />
      </div>
    </Card>
  );
};
