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
      <div className="grid">
        <p className="text-lg text-blue-700 font-semibold">Acciones Rápidas</p>
        <p className=" text-sm text-gray-600">
          Gestiona tus quinielas de la semana
        </p>
      </div>

      <Button
        type="button"
        title={`Hacer Quiniela Semana ${currentWeek}`}
        icon="play"
        onClick={() => router.push("/quiniela")}
      />

      <div className="grid lg:grid-cols-2 gap-4">
        <Button
          type="button"
          title="Clasificación"
          theme="normal"
          onClick={() => router.push("/standings")}
        />
        <Button
          type="button"
          title={`Resultados Semana ${currentWeek}`}
          theme="normal"
          onClick={() => router.push("/scores")}
        />
        <Button
          type="button"
          title="Survivor"
          theme="normal"
          onClick={() => router.push("/survivor")}
        />
        <Button
          type="button"
          title="Activar Survivor"
          theme="normal"
          onClick={() => router.push("/captures/survivorActivation")}
        />
        <Button
          type="button"
          title="Ganancias"
          theme="normal"
          onClick={() => router.push("/earnings")}
        />
        <Button
          type="button"
          title="Simulador"
          theme="normal"
          onClick={() => router.push("/simulator")}
        />
      </div>
    </Card>
  );
};
