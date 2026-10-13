"use client";

import { useState } from "react";
import { PageHeader } from "@/components/shared/pageHeader/PageHeader";
import { MainContainer } from "@/components/ui/containers/MainContainer";
import { Modal } from "@/components/shared/modal/Modal";
import { useGetProcessStatus } from "@/hooks/queries/monitor/useGetProcessStatus";
import { CalendarRange, ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/shared/button/Button";

// ── Types ────────────────────────────────────────────────────────────────────

interface QuinielaCierre {
  idQuiniela: number;
  idParticipante: number;
  nomParticipante: string;
}

interface QuinielaApertura {
  idQuiniela: number;
  titQuiniela: string;
}

interface CierreFlag {
  estatus: number;
  detalle?: QuinielaCierre[];
}

interface AperturaFlag {
  estatus: number;
  detalle?: QuinielaApertura[];
}

interface CierreData {
  bQuiniela: CierreFlag;
  bResultado: CierreFlag;
  bSurvivor: CierreFlag;
  bExiste: CierreFlag;
  bPago: CierreFlag;
  bPuntos: CierreFlag;
}

interface AperturaData {
  bQuinTot: AperturaFlag;
  bQuinPer: AperturaFlag;
  bApertura: AperturaFlag;
  bCierre: AperturaFlag;
}

interface ErrorItem {
  msgError: string;
}

interface ProcesoDetalle {
  idProceso: number;
  nombreProceso: string;
  fOperacion: string;
  horaInicio: string;
  horaFinal: string;
  sitProceso: "CO" | "ER";
  listaErrores?: ErrorItem[];
}

interface MonitorItem {
  cveMonitor: string;
  descMonitor: string;
  ultimaFechaEjecucion: string;
  bCorrecto: boolean;
  detalle?: ProcesoDetalle[];
}

interface ProcessStatusData {
  idPeriodo: string;
  totalCierre: number;
  totalApertura: number;
  cierre: CierreData;
  apertura: AperturaData;
  monitores: MonitorItem[];
}

// ── Shared ───────────────────────────────────────────────────────────────────

const tableHeadCls =
  "px-4 py-2 text-xs font-semibold uppercase tracking-wider text-center bg-gray-100 text-gray-600 border-b";
const tableCellCls =
  "px-4 py-2 text-sm text-center text-gray-700 border-b border-gray-100";

// ── Cierre ───────────────────────────────────────────────────────────────────

const CierreSection = ({
  cierre,
  totalCierre,
}: {
  cierre: CierreData;
  totalCierre: number;
}) => {
  const [openFlag, setOpenFlag] = useState<string | null>(null);

  const flags: { label: string; key: string; data: CierreFlag }[] = [
    { label: "Quinielas", key: "bQuiniela", data: cierre.bQuiniela },
    { label: "Resultados", key: "bResultado", data: cierre.bResultado },
    { label: "Survivor", key: "bSurvivor", data: cierre.bSurvivor },
    { label: "Existe", key: "bExiste", data: cierre.bExiste },
    { label: "Surv. Pagado", key: "bPago", data: cierre.bPago },
    { label: "Puntos", key: "bPuntos", data: cierre.bPuntos },
  ];

  const toggle = (key: string) =>
    setOpenFlag((prev) => (prev === key ? null : key));

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <div
        className={`text-white text-sm font-bold px-4 py-2 flex justify-between ${totalCierre === 0 ? "bg-red-500" : "bg-green-500"}`}
      >
        <p>CIERRE</p>
      </div>

      <div className="p-4 grid gap-3 bg-white">
        {/* Flag bars */}
        {flags.map(({ label, key, data }) => {
          const ok = data.estatus === 1;
          const hasDetail = !ok && !!data.detalle?.length;
          const isOpen = openFlag === key;

          return (
            <div key={key}>
              <div className="flex items-center gap-3">
                <span className="w-28 text-sm text-gray-600 text-right shrink-0">
                  {label}
                </span>
                <div
                  className={`flex-1 h-6 rounded ${ok ? "bg-green-400" : "bg-red-500"}`}
                />
                {hasDetail && (
                  <button
                    onClick={() => toggle(key)}
                    className="shrink-0 text-blue-700 hover:text-blue-900"
                    title="Ver detalle"
                  >
                    {isOpen ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}
                  </button>
                )}
              </div>

              {isOpen && hasDetail && (
                <div className="mt-2 overflow-x-auto border rounded border-gray-200">
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        <th className={tableHeadCls}>Quiniela</th>
                        <th className={tableHeadCls}>Núm. Part.</th>
                        <th className={tableHeadCls}>Nombre</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.detalle!.map((q, i) => (
                        <tr key={i} className="hover:bg-gray-50">
                          <td className={tableCellCls}>{q.idQuiniela}</td>
                          <td className={tableCellCls}>{q.idParticipante}</td>
                          <td className={tableCellCls}>{q.nomParticipante}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ── Apertura ─────────────────────────────────────────────────────────────────

const AperturaSection = ({
  apertura,
  totalApertura,
}: {
  apertura: AperturaData;
  totalApertura: number;
}) => {
  const [openFlag, setOpenFlag] = useState<string | null>(null);

  const flags: { label: string; key: string; data: AperturaFlag }[] = [
    { label: "Quinielas", key: "bQuinTot", data: apertura.bQuinTot },
    { label: "Periodo", key: "bQuinPer", data: apertura.bQuinPer },
    { label: "Cierre", key: "bCierre", data: apertura.bCierre },
    { label: "Apertura", key: "bApertura", data: apertura.bApertura },
  ];

  const toggle = (key: string) =>
    setOpenFlag((prev) => (prev === key ? null : key));

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <div
        className={`text-white text-sm font-bold px-4 py-2 flex justify-between ${totalApertura === 0 ? "bg-red-500" : "bg-green-500"}`}
      >
        <span>APERTURA</span>
      </div>

      <div className="p-4 grid gap-3 bg-white">
        {/* Flag bars */}
        {flags.map(({ label, key, data }) => {
          const ok = data.estatus === 1;
          const hasDetail = !ok && !!data.detalle?.length;
          const isOpen = openFlag === key;

          return (
            <div key={key}>
              <div className="flex items-center gap-3">
                <span className="w-28 text-sm text-gray-600 text-right shrink-0">
                  {label}
                </span>
                <div
                  className={`flex-1 h-6 rounded ${ok ? "bg-green-400" : "bg-red-500"}`}
                />
                {hasDetail && (
                  <button
                    onClick={() => toggle(key)}
                    className="shrink-0 text-blue-700 hover:text-blue-900"
                    title="Ver detalle"
                  >
                    {isOpen ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}
                  </button>
                )}
              </div>

              {isOpen && hasDetail && (
                <div className="mt-2 overflow-x-auto border rounded border-gray-200">
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        <th className={tableHeadCls}>Quiniela</th>
                        <th className={tableHeadCls}>Título</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.detalle!.map((q, i) => (
                        <tr key={i} className="hover:bg-gray-50">
                          <td className={tableCellCls}>{q.idQuiniela}</td>
                          <td className={tableCellCls}>{q.titQuiniela}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ── Monitor ───────────────────────────────────────────────────────────────────

const MonitorRow = ({ monitor }: { monitor: MonitorItem }) => {
  const [expanded, setExpanded] = useState(false);
  const [errors, setErrors] = useState<ErrorItem[] | null>(null);

  const headerBg = monitor.bCorrecto ? "bg-green-500" : "bg-red-500";

  return (
    <>
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <button
          onClick={() => setExpanded((v) => !v)}
          className={`w-full flex items-center justify-between px-4 py-3 ${headerBg} text-white font-semibold text-sm`}
        >
          <span>
            {monitor.descMonitor}
            {monitor.ultimaFechaEjecucion && (
              <span className="ml-4 font-normal opacity-90 text-xs">
                Última ejecución: {monitor.ultimaFechaEjecucion}
              </span>
            )}
          </span>
          {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>

        {expanded && (
          <>
            {monitor.detalle && monitor.detalle.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className={tableHeadCls}>Proceso</th>
                      <th className={tableHeadCls}>Operación</th>
                      <th className={tableHeadCls}>Hora Inicio</th>
                      <th className={tableHeadCls}>Hora Final</th>
                      <th className={tableHeadCls}>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monitor.detalle.map((proc, i) => (
                      <tr
                        key={i}
                        className={
                          proc.sitProceso === "ER"
                            ? "bg-red-50"
                            : "bg-white hover:bg-gray-50"
                        }
                      >
                        <td className={tableCellCls}>{proc.nombreProceso}</td>
                        <td className={tableCellCls}>{proc.fOperacion}</td>
                        <td className={tableCellCls}>{proc.horaInicio}</td>
                        <td className={tableCellCls}>{proc.horaFinal}</td>
                        <td className={tableCellCls}>
                          {proc.sitProceso === "ER" ? (
                            <button
                              onClick={() => setErrors(proc.listaErrores ?? [])}
                              className="text-xs font-bold text-red-600 underline hover:text-red-800"
                            >
                              ERROR — ver detalle
                            </button>
                          ) : (
                            <span className="text-xs font-bold text-green-600">
                              CORRECTO
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-sm text-gray-400 text-center py-4">
                Sin procesos registrados
              </p>
            )}
          </>
        )}
      </div>

      <Modal isModalOpen={!!errors} closeModal={() => setErrors(null)}>
        <p className="text-base font-bold text-red-600 mb-4">
          Errores del proceso
        </p>
        <ul className="grid gap-2">
          {errors?.map((e, i) => (
            <li
              key={i}
              className="text-sm font-mono break-all bg-red-50 border border-red-200 rounded p-3 text-gray-800"
            >
              {e.msgError}
            </li>
          ))}
          {errors?.length === 0 && (
            <li className="text-sm text-gray-400">
              Sin información de errores.
            </li>
          )}
        </ul>
      </Modal>
    </>
  );
};

// ── Page ─────────────────────────────────────────────────────────────────────

export default function MonitorPage() {
  const { data, isLoading } = useGetProcessStatus();
  const status = data?.data?.[0] as ProcessStatusData | undefined;
  // console.log("Process Status:", status);

  return (
    <MainContainer>
      <div className="grid gap-6 content-start">
        <PageHeader
          title="Monitor de procesos"
          text="Visualiza el estado de los diferentes procesos del sistema en tiempo real"
        />

        <div className="flex items-center gap-2 text-gray-700">
          <CalendarRange size={18} className="text-blue-600" />
          <span className="font-semibold">
            Periodo:{" "}
            <span className="text-blue-600">
              {isLoading ? "..." : (status?.idPeriodo ?? "No disponible")}
            </span>
          </span>
        </div>

        {isLoading && (
          <p className="text-center text-gray-400 py-12">Cargando monitor...</p>
        )}

        {!isLoading && status && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {status.cierre && (
                <CierreSection
                  cierre={status.cierre}
                  totalCierre={status.totalCierre}
                />
              )}
              {status.apertura && (
                <AperturaSection
                  apertura={status.apertura}
                  totalApertura={status.totalApertura}
                />
              )}
            </div>

            {status.monitores && status.monitores.length > 0 && (
              <div className="grid gap-3">
                <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest">
                  Monitores
                </h2>
                {status.monitores.map((monitor, i) => (
                  <MonitorRow key={monitor.cveMonitor ?? i} monitor={monitor} />
                ))}
              </div>
            )}
          </>
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
