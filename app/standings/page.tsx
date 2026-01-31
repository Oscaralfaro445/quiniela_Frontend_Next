"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MainContainer } from "@/components/ui/containers/MainContainer";
import { Button } from "@/components/shared/button/Button";
import { StatisticsCard } from "@/components/standings/StatisticsCard";
import { PageHeader } from "@/components/shared/pageHeader/PageHeader";
import { StandingsCard } from "@/components/standings/StandingsCard";
import { TabSelector, TabType } from "@/components/shared/tabs/TabSelector";

export default function StandingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>(0);
  const router = useRouter();

  return (
    <MainContainer>
      <div className="grid gap-4">
        <PageHeader
          title="Clasificación"
          text="Consulta las posiciones semanales y globales de todos los participantes"
        />

        <StatisticsCard activeTab={activeTab} />

        <TabSelector
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          text={["Semanal", "Global"]}
        />

        <StandingsCard activeTab={activeTab} />

        <div className="flex w-full gap-4 justify-center">
          <Link href="/dashboard">
            <Button type="button" title="Volver al Dashboard" theme="normal" />
          </Link>

          <Button
            type="button"
            title="Ver Quiniela"
            onClick={() => router.push("/quiniela")}
          />
        </div>
      </div>
    </MainContainer>
  );
}
