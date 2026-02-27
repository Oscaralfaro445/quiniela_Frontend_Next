import { useRouter } from "next/navigation";
import { useGetMe } from "@/hooks/queries/user/useGetMe";
import { Button } from "../shared/button/Button";
import { Card } from "../shared/card/Card";

const infoButtons = [
  { title: "Clasificación", path: "/standings" },
  { title: "Resultados", path: "/scores" },
  { title: "Survivor", path: "/survivor" },
  { title: "Activar Survivor", path: "/captures/survivorActivation" },
  { title: "Ganancias", path: "/earnings" },
  { title: "Simulador", path: "/simulator" },
];

export const SwiftActionsCard = () => {
  const router = useRouter();
  const { data } = useGetMe();
  const user = data?.data?.[0];
  const currentWeek = user?.idPeriodo;

  return (
    <Card>
      <div>
        <p className="text-lg text-blue-600 font-semibold">Acciones Rápidas</p>
        <p className=" text-sm text-neutral-600">
          Gestiona tus quinielas de la semana
        </p>
      </div>

      <Button
        type="button"
        title={`Quiniela semana ${currentWeek ?? ""}`}
        icon="play"
        onClick={() => router.push("/quiniela")}
      />

      <div className="grid md:grid-cols-2 gap-4">
        {infoButtons.map((button, index) => (
          <Button
            key={index}
            type="button"
            title={button.title}
            theme="normal"
            onClick={() => router.push(button.path)}
          />
        ))}
      </div>
    </Card>
  );
};
