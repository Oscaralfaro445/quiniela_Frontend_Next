import { useGetConferenceStandings } from "@/hooks/conference/queries/useGetConferenceStandings";
import { Conference, Division } from "@/types/conference/conference";
import { Card } from "../shared/card/Card";
import { TabType } from "../shared/tabs/TabSelector";
import { TeamLogo } from "../shared/teamLogo/TeamLogo";

interface ConferenceSectionProps {
  activeTab: TabType;
}

export const ConferenceSection = ({ activeTab }: ConferenceSectionProps) => {
  const { isPending, isError, data } = useGetConferenceStandings();
  const conference: Conference = data?.data?.[0]?.NFL?.[activeTab];
  const divisions = conference?.divisiones;

  return (
    <div className="grid grid-cols-2 gap-8">
      {divisions?.map((division) => (
        <Card key={division?.DIVISION}>
          <DivisionSection division={division} />
        </Card>
      ))}
    </div>
  );
};

interface DivisionSectionProps {
  division: Division;
}

const DivisionSection = ({ division }: DivisionSectionProps) => {
  return (
    <table>
      <thead className="bg-neutral-100">
        <tr className="text-left font-semibold">
          <th className="w-1/2">{division?.DIVISION}</th>
          <th>Ganados</th>
          <th>Perdidos</th>
          <th>Empatados</th>
        </tr>
      </thead>

      <tbody>
        {division?.equipos.map((equipo) => (
          <tr key={equipo.nombre}>
            <td className="flex gap-2 items-center">
              <TeamLogo teamName={equipo?.nombre} />
              {equipo.nombre}
            </td>
            <td>{equipo.ganados}</td>
            <td>{equipo.perdidos}</td>
            <td>{equipo.empatados}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
