"use client";

import { useGetQuinielaVerification } from "@/hooks/queries/useGetQuinielaVerification";
import { Card } from "@/components/shared/card/Card";
import { StatisticsCard } from "@/components/processes/quinielaVerification/StatisticsCard";
import Link from "next/link";
import { Button } from "@/components/shared/button/Button";
import { PageHeader } from "@/components/shared/pageHeader/PageHeader";
import { Icon } from "@/components/shared/icon/Icon";
import { MainContainer } from "@/components/ui/containers/MainContainer";

export interface Participant {
  iD: number;
  nombre: string;
  quiniela: number;
  resultados: number;
  survivor: boolean;
  existe: number;
}

export default function QuinielaVerificationPage() {
  const { isPending, isError, isSuccess, data } = useGetQuinielaVerification();
  const participants: Participant[] = data?.data;

  const getIcon = (status: boolean) => {
    switch (status) {
      case true:
        return <Icon name="check" size={20} color="green" />;
      case false:
        return <Icon name="x" size={20} color="red" />;
    }
  };

  return (
    <MainContainer>
      <div className="grid gap-4 content-start">
        <PageHeader
          title="Proceso de verificación de información"
          text="Gestiona la carga y procesamiento de datos de participantes y quinielas"
        />

        <StatisticsCard />

        {isSuccess && (
          <Card>
            <div className="grid gap-4">
              <div className="grid">
                <p className="text-lg text-neutral-700 font-semibold">
                  Lista de participantes
                </p>
                <p className="text-sm text-neutral-600">
                  Visualiza el estado general de cada usuario
                </p>
              </div>

              {isPending && <p>Cargando datos...</p>}

              {isError && <p>Error al cargar los datos...</p>}

              {isSuccess && participants && (
                <div className="w-full overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-blue-600">
                        <th className="text-white font-semibold">Nombre</th>
                        <th className="text-white font-semibold">Quiniela</th>
                        <th className="text-white font-semibold">Resultados</th>
                        <th className="text-white font-semibold">Survivor</th>
                      </tr>
                    </thead>

                    <tbody>
                      {participants.map((participant, index) => (
                        <tr
                          key={index}
                          className="border-b border-neutral-300 hover:bg-gray-200"
                        >
                          <td className="">{participant.nombre}</td>
                          <td className="">
                            {getIcon(!!participant.quiniela)}
                          </td>
                          <td className="">
                            {getIcon(!!participant.resultados)}
                          </td>
                          <td className="">
                            {getIcon(
                              participant.survivor === !!participant.existe,
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </Card>
        )}

        <div className="flex w-full gap-4 justify-center">
          <Link href="/dashboard">
            <Button type="button" title="Volver al Dashboard" theme="normal" />
          </Link>
        </div>
      </div>
    </MainContainer>
  );
}
