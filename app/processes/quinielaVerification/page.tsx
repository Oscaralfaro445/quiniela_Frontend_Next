"use client";

import { useGetQuinielaVerification } from "@/hooks/quinielaVerification/queries/useGetQuinielaVerification";
import { Card } from "@/components/shared/card/Card";
import { ProtectedRoute } from "@/components/shared/protectedRoute/ProtectedRoute";
import { Title } from "@/components/shared/text/Title";
import { TextBody } from "@/components/shared/text/TextBody";
import { StatisticsCard } from "@/components/processes/quinielaVerification/StatisticsCard";
import Link from "next/link";
import { Button } from "@/components/shared/button/Button";

export interface Participant {
  iD: number;
  nombre: string;
  quin: number;
  quinRes: number;
  survivor: boolean;
  existe: number;
}

export default function QuinielaVerificationPage() {
  const { isPending, isError, isSuccess, data } = useGetQuinielaVerification();
  const participants: Participant[] = data?.data;

  return (
    <ProtectedRoute>
      <section className="pt-18">
        <div className="grid lg:flex w-full max-w-[1280px] mx-auto px-10 py-8 gap-4 justify-center lg:justify-between">
          <div className="grid gap-2">
            <Title title="Proceso de Verificación de Información" />
            <TextBody
              text="Gestiona la carga y procesamiento de datos de participantes y
          quinielas."
            />
          </div>

          <div className="flex h-fit justify-center items-center border-2 border-blue-600 rounded-2xl">
            <p className="px-2 py-1 text-sm font-semibold text-blue-700">
              NFL temporada 2025
            </p>
          </div>
        </div>
      </section>

      <StatisticsCard />

      {isPending && <div>Cargando datos...</div>}

      {isError && <div>Error al cargar los datos.</div>}

      {isSuccess && (
        <section>
          <div className="w-full max-w-[1280px] mx-auto px-10 py-8">
            <Card>
              <div className="flex flex-col">
                <span className="text-lg text-blue-700 font-semibold">
                  Lista de Participantes
                </span>
                <span className=" text-sm text-gray-600">
                  Visualiza el estado general de cada usuario
                </span>
              </div>

              <table>
                <thead>
                  <tr className="bg-blue-700 hover:bg-blue-700">
                    <th className="text-white font-semibold">ID</th>
                    <th className="text-white font-semibold">Nombre</th>

                    <th className="text-white font-semibold text-center">
                      Survivor
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {participants.map((participant, index) => (
                    <tr
                      key={index}
                      className="border-b border-neutral-300 hover:bg-gray-200"
                    >
                      <td className="text-center">{participant.iD}</td>
                      <td className="text-center">{participant.nombre}</td>
                      <td className="text-center">
                        {participant.survivor === !!participant.existe ? (
                          <div className="bg-green-600">Sí</div>
                        ) : (
                          <div className="bg-neutral-400">No</div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>
        </section>
      )}

      <section>
        <div className="flex w-full max-w-[1280px] mx-auto px-10 py-8 gap-4 justify-center">
          <Link href="/dashboard">
            <Button type="button" title="Volver al Dashboard" theme="normal" />
          </Link>

          <Button type="submit" title="Enviar Quiniela" onClick={() => {}} />
        </div>
      </section>
    </ProtectedRoute>
  );
}
