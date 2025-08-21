import { useRouter } from "next/navigation";
import { Button } from "../shared/button/Button";
import { Card } from "../shared/card/Card";

interface SwiftActionsCardProps {
  currentWeek: string;
}

export const SwiftActionsCard = ({ currentWeek }: SwiftActionsCardProps) => {
  const router = useRouter();

  return (
    <Card>
      <div className="grid w-full">
        <span className="text-gray-900">Acciones Rápidas</span>
        <span>Gestiona tus quinielas de la semana</span>
      </div>

      <Button
        type="button"
        title={`Hacer Quiniela Semana ${currentWeek}`}
        icon="play"
        onClick={() => router.push("/quinielaCapture")}
      />

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="grid w-full gap-4">
          <Button
            type="button"
            title="Clasificación"
            theme="normal"
            onClick={() => router.push("/positionQuery")}
          />
          <Button
            type="button"
            title={`Resultados Semana ${currentWeek}`}
            theme="normal"
            onClick={() => router.push("/markerQuery")}
          />
        </div>

        <div className="grid gap-4">
          <Button
            type="button"
            title="Survivor"
            theme="normal"
            onClick={() => router.push("/survivorQuery")}
          />
          <Button
            type="button"
            title="Activar Survivor"
            theme="normal"
            onClick={() => router.push("/captures/survivorActivation")}
          />
        </div>
      </div>
    </Card>
  );
};
