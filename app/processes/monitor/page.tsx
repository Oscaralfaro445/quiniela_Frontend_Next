"use client";

import { useState } from "react";
import { PageHeader } from "@/components/shared/pageHeader/PageHeader";
import { MainContainer } from "@/components/ui/containers/MainContainer";
import { Modal } from "@/components/shared/modal/Modal";
import { useGetProcessStatus } from "@/hooks/queries/monitor/useGetProcessStatus";
import { CalendarRange, ChevronDown, ChevronRight } from "lucide-react";

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

interface CierreData {
  totalCierre: number;
  bQuiniela: boolean;
  bResultado: boolean;
  bSurvivor: boolean;
  bExiste: boolean;
  bPago: boolean;
  quinielas?: QuinielaCierre[];
}

interface AperturaData {
  totalApertura: number;
  bQuinTot: boolean;
  bQuinPer: boolean;
  bApertura: boolean;
  bCierre: boolean;
  quinielas?: QuinielaApertura[];
}

interface ErrorItem {
  msgError: string;
}

interface ProcesoDetalle {
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
  idPeriodo: number;
  cierre: CierreData;
  apertura: AperturaData;
  monitores: MonitorItem[];
}

// ── Shared ───────────────────────────────────────────────────────────────────

const StatusBar = ({ ok, label }: { ok: boolean; label: string }) => (
  <div className="flex items-center gap-3">
    <span className="w-28 text-sm text-gray-600 text-right shrink-0">
      {label}
    </span>
    <div
      className={`flex-1 h-6 rounded ${ok ? "bg-green-400" : "bg-red-500"}`}
    />
  </div>
);

const tableHeadCls =
  "px-4 py-2 text-xs font-semibold uppercase tracking-wider text-center bg-gray-100 text-gray-600 border-b";
const tableCellCls =
  "px-4 py-2 text-sm text-center text-gray-700 border-b border-gray-100";

// ── Cierre ───────────────────────────────────────────────────────────────────

const CierreSection = ({ cierre }: { cierre: CierreData }) => {
  const [open, setOpen] = useState(false);

  const flags = [
    { label: "Quinielas", value: cierre.bQuiniela },
    { label: "Resultados", value: cierre.bResultado },
    { label: "Survivor", value: cierre.bSurvivor },
    { label: "Existe", value: cierre.bExiste },
    { label: "Surv. Pagado", value: cierre.bPago },
  ];

  const anyFalse = flags.some((f) => !f.value);

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <div className="bg-gray-700 text-white text-sm font-bold px-4 py-2 flex justify-between">
        <span>CIERRE</span>
        {cierre.totalCierre !== undefined && (
          <span className="font-normal">Total: {cierre.totalCierre}</span>
        )}
      </div>

      <div className="p-4 grid gap-2 bg-white">
        {flags.map(({ label, value }) => (
          <StatusBar key={label} label={label} ok={value} />
        ))}

        {anyFalse && cierre.quinielas && cierre.quinielas.length > 0 && (
          <button
            onClick={() => setOpen((v) => !v)}
            className="mt-2 flex items-center gap-1 text-xs text-blue-700 font-semibold hover:underline"
          >
            {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            Drill Down — Quinielas con problema
          </button>
        )}
      </div>

      {open && cierre.quinielas && cierre.quinielas.length > 0 && (
        <div className="border-t border-gray-200 overflow-x-auto">
          <p className="text-xs font-bold text-gray-500 uppercase px-4 pt-3 pb-1">
            Quinielas
          </p>
          <table className="min-w-full">
            <thead>
              <tr>
                <th className={tableHeadCls}>Quiniela</th>
                <th className={tableHeadCls}>Núm. Part.</th>
                <th className={tableHeadCls}>Nombre</th>
              </tr>
            </thead>
            <tbody>
              {cierre.quinielas.map((q, i) => (
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
};

// ── Apertura ─────────────────────────────────────────────────────────────────

const AperturaSection = ({ apertura }: { apertura: AperturaData }) => {
  const [open, setOpen] = useState(false);

  const flags = [
    { label: "Quinielas", value: apertura.bQuinTot },
    { label: "Periodo", value: apertura.bQuinPer },
    { label: "Cierre", value: apertura.bCierre },
    { label: "Apertura", value: apertura.bApertura },
  ];

  const anyFalse = flags.some((f) => !f.value);

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <div className="bg-gray-700 text-white text-sm font-bold px-4 py-2 flex justify-between">
        <span>APERTURA</span>
        {apertura.totalApertura !== undefined && (
          <span className="font-normal">Total: {apertura.totalApertura}</span>
        )}
      </div>

      <div className="p-4 grid gap-2 bg-white">
        {flags.map(({ label, value }) => (
          <StatusBar key={label} label={label} ok={value} />
        ))}

        {anyFalse && apertura.quinielas && apertura.quinielas.length > 0 && (
          <button
            onClick={() => setOpen((v) => !v)}
            className="mt-2 flex items-center gap-1 text-xs text-blue-700 font-semibold hover:underline"
          >
            {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            Drill Down — Quinielas con problema
          </button>
        )}
      </div>

      {open && apertura.quinielas && apertura.quinielas.length > 0 && (
        <div className="border-t border-gray-200 overflow-x-auto">
          <p className="text-xs font-bold text-gray-500 uppercase px-4 pt-3 pb-1">
            Quinielas
          </p>
          <table className="min-w-full">
            <thead>
              <tr>
                <th className={tableHeadCls}>Quiniela</th>
                <th className={tableHeadCls}>Título</th>
              </tr>
            </thead>
            <tbody>
              {apertura.quinielas.map((q, i) => (
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
};

// ── Monitor ───────────────────────────────────────────────────────────────────

const MonitorRow = ({ monitor }: { monitor: MonitorItem }) => {
  const [expanded, setExpanded] = useState(false);
  const [errors, setErrors] = useState<ErrorItem[] | null>(null);

  const headerBg = monitor.bCorrecto ? "bg-green-500" : "bg-red-500";

  return (
    <>
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        {/* Colored header — click to expand/collapse */}
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

        {/* Process detail table */}
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

      {/* Error modal — secondary drill-down */}
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
  console.log("Monitor status data:", status); // Debug log to inspect data structure

  return (
    <MainContainer>
      <div className="grid gap-6 content-start">
        <PageHeader
          title="Monitor de procesos"
          text="Visualiza el estado de los diferentes procesos del sistema en tiempo real"
        />

        {/* Period */}
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
            {/* 1. CIERRE + 2. APERTURA side by side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {status.cierre && <CierreSection cierre={status.cierre} />}
              {status.apertura && (
                <AperturaSection apertura={status.apertura} />
              )}
            </div>

            {/* 3. MONITORES */}
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
      </div>
    </MainContainer>
  );
}
