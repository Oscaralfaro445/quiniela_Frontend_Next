import { ConferenceStandings } from "./ConferenceStandings";
import { Card } from "../shared/card/Card";

export const ConferenceCard = () => {
  return (
    <div className="lg:col-span-2">
      <Card>
        <div className="grid gap-4">
          <div>
            <p className="text-lg text-blue-600 font-semibold">
              Conferencia de la NFL
            </p>
            <p className=" text-sm text-neutral-600">Temporada 2025-2026</p>
          </div>
          <ConferenceStandings />
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              G = Ganados • P = Perdidos • E = Empatados
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
