import { ConferenceCard } from "@/components/favoriteTeam/ConferenceCard";
import { LastGameCard } from "@/components/favoriteTeam/LastGameCard";
import { UpcomingGamesCard } from "@/components/favoriteTeam/UpcomingGamesCard";
import { PageHeader } from "@/components/shared/pageHeader/PageHeader";
import { MainContainer } from "@/components/ui/containers/MainContainer";

export default function FavoriteTeamPage() {
  return (
    <MainContainer>
      <div className="grid gap-4">
        <PageHeader
          title="Panel de tu equipo favorito"
          text="Aquí podrás ver toda la información relevante sobre tu equipo favorito, incluyendo estadísticas, próximos partidos y noticias destacadas."
        />

        <ConferenceCard />
        <LastGameCard />
        <UpcomingGamesCard />
      </div>
    </MainContainer>
  );
}
