import { ConferenceStandings } from "@/components/conference/ConferenceStandings";
import { MainContainer } from "@/components/ui/containers/MainContainer";

export default function ConferencePage() {
  return (
    <MainContainer>
      <h1 className="text-7xl text-center text-blue-600 font-extrabold">
        Conferencias de la NFL
      </h1>
      <p className="text-center">Temporada 2025-2026</p>
      <ConferenceStandings />
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          G = Ganados • P = Perdidos • E = Empatados
        </p>
      </div>
    </MainContainer>
  );
}
