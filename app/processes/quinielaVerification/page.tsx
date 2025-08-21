"use client";

import useGetQuinielaVerification from "@/hooks/quinielaVerification/queries/useGetQuinielaVerification";
import { Card } from "@/components/shared/card/Card";
import { Icon } from "@/components/shared/icon/Icon";
import { ProtectedRoute } from "@/components/shared/protectedRoute/ProtectedRoute";
import { Title } from "@/components/shared/text/Title";
import { TextBody } from "@/components/shared/text/TextBody";

interface Participant {
  iD: number;
  nombre: string;
  quin: number;
  quinRes: number;
  survivor: boolean;
  existe: number;
}

export default function QuinielaVerificationPage() {
  const quinielaVerification = useGetQuinielaVerification();
  const participants: Participant[] = quinielaVerification?.data?.data;

  const totalParticipants = participants?.length;
  const activeParticipants = participants?.filter((p) => p.existe === 1).length;
  const quinielaParticipants = participants?.filter((p) => p.quin === 1).length;
  const survivorParticipants = participants?.filter((p) => p.survivor).length;
  const resurrectionParticipants = participants?.filter(
    (p) => p.quinRes === 1
  ).length;

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

      <section>
        <div className="grid lg:flex w-full max-w-[1280px] mx-auto px-10 py-8 gap-4 justify-center lg:justify-between">
          <Card>
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="text-sm font-medium">Total Participantes</div>
              <Icon name="check" className="h-4 w-4 text-green-600" />{" "}
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-700">
                {totalParticipants}
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="text-sm font-medium">Activos</div>
              <Icon name="check" className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {activeParticipants}
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="text-sm font-medium">En Quiniela</div>
              <Icon name="trophy" className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {quinielaParticipants}
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="text-sm font-medium">En Survivor</div>
              <Icon name="shield" className="h-4 w-4 text-orange-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">
                {survivorParticipants}
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="text-sm font-medium">Resurrección</div>
              <Icon name="user" className="h-4 w-4 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {resurrectionParticipants}
              </div>
            </div>
          </Card>
        </div>
      </section>

      {participants && (
        <section>
          <div className="w-full max-w-[1280px] mx-auto px-10 py-8">
            <Card>
              <div>
                <div className="flex items-center space-x-2">
                  <Icon name="users" className="h-5 w-5 text-blue-700" />
                  <span>Lista de Participantes</span>
                </div>

                <p>
                  Visualiza el estado de participación de cada usuario en las
                  diferentes modalidades
                </p>
              </div>

              <div className="w-full overflow-x-auto">
                <table>
                  <thead>
                    <tr className="bg-blue-700 hover:bg-blue-700">
                      <th className="text-white font-semibold">ID</th>
                      <th className="text-white font-semibold">Nombre</th>
                      <th className="text-white font-semibold text-center">
                        Estado
                      </th>
                      <th className="text-white font-semibold text-center">
                        Quiniela
                      </th>
                      <th className="text-white font-semibold text-center">
                        Resurrección
                      </th>
                      <th className="text-white font-semibold text-center">
                        Survivor
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {participants.map((participant, index) => (
                      <tr
                        key={participant.iD}
                        className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="font-medium">{participant.iD}</td>
                        <td className="font-medium">{participant.nombre}</td>
                        <td className="text-center">
                          {participant.existe === 1 ? (
                            <div className="bg-green-600">Activo</div>
                          ) : (
                            <div className="bg-gray-400">Inactivo</div>
                          )}
                        </td>
                        <td className="text-center">
                          {participant.quin === 1 ? (
                            <div className="bg-blue-600">Sí</div>
                          ) : (
                            <div className="bg-gray-400">No</div>
                          )}
                        </td>
                        <td className="text-center">
                          {participant.quinRes === 1 ? (
                            <div className="bg-purple-600">Sí</div>
                          ) : (
                            <div className="bg-gray-400">No</div>
                          )}
                        </td>
                        <td className="text-center">
                          {participant.survivor ? (
                            <div className="bg-orange-600">Sí</div>
                          ) : (
                            <div className="bg-gray-400">No</div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </section>
      )}
    </ProtectedRoute>
  );
}
