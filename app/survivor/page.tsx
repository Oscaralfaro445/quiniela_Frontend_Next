"use client";

import { Icon } from "@/components/shared/icon/icon";
import { useState } from "react";

export default function SurvivorPage() {
  const semanas = Object.keys(survivor[0] || {})
    .filter((key) => key.startsWith("NOM_EQ_"))
    .map((key) => parseInt(key.split("_")[2]));

  const [rango, setRango] = useState({
    inicio: semanas.length - 9,
    fin: semanas.length,
  });
  const semanasVisibles = semanas.slice(rango.inicio, rango.fin);

  const finalSemana = () => {
    if (rango.fin < semanas.length) {
      setRango({ inicio: semanas.length - 9, fin: semanas.length });
    }
  };

  const avanzarSemana = () => {
    if (rango.fin < semanas.length) {
      setRango({ inicio: rango.inicio + 1, fin: rango.fin + 1 });
    }
  };

  const inicioSemana = () => {
    if (rango.inicio > 0) {
      setRango({ inicio: (rango.inicio = 0), fin: rango.inicio + 9 });
    }
  };

  const retrocederSemana = () => {
    if (rango.inicio > 0) {
      setRango({ inicio: rango.inicio - 1, fin: rango.fin - 1 });
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-x-auto px-2">
      <table className="w-full min-w-max">
        <thead>
          <tr className="bg-blue-600 text-white text-center text-md leading-normal">
            <th className="">Participante</th>
            <th>SUV</th>
            <th>Aciertos</th>
            <th>Inv($)</th>
            {semanasVisibles.map((semana) => (
              <th key={`header-${semana}`}>Semana {semana}</th>
            ))}
          </tr>
        </thead>
        <tbody className="text-center text-gray-700 text-sm">
          {survivor.map((participante) => (
            <SurvivorTableRow
              key={participante.ID_PARTICIPANTE}
              participante={participante}
              semanasVisibles={semanasVisibles}
            />
          ))}
        </tbody>
      </table>

      <div className="flex w-full justify-end mt-10 gap-4">
        <button
          onClick={inicioSemana}
          disabled={rango.inicio === 0}
          className={`px-4 py-2 bg-blue-600 text-white rounded ${
            rango.inicio === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <Icon name="chevrons-left" />
        </button>

        <button
          onClick={retrocederSemana}
          disabled={rango.inicio === 0}
          className={`px-4 py-2 bg-blue-600 text-white rounded ${
            rango.inicio === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <Icon name="chevron-left" />
        </button>

        <button
          onClick={avanzarSemana}
          disabled={rango.fin >= semanas.length}
          className={`px-4 py-2 bg-blue-600 text-white rounded ${
            rango.fin >= semanas.length ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <Icon name="chevron-right" />
        </button>

        <button
          onClick={finalSemana}
          disabled={rango.fin >= semanas.length}
          className={`px-4 py-2 bg-blue-600 text-white rounded ${
            rango.fin >= semanas.length ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <Icon name="chevron-right" />
        </button>
      </div>
    </div>
  );
}

type SurvivorTableRowProps = {
  participante: {
    ID_PARTICIPANTE: number;
    NOM_PARTICIPANTE: string;
    NUM_SURVIVORS: number;
    NUM_ACIERTOS: number;
    IMP_INVERSION: number;
    [key: `NOM_EQ_${number}`]: string;
    [key: `RES_EQ_${number}`]: string; // Para incluir dinámicamente las semanas
  };
  semanasVisibles: number[]; // Las semanas a mostrar
};

const SurvivorTableRow = ({
  participante,
  semanasVisibles,
}: SurvivorTableRowProps) => {
  return (
    <tr>
      <td className="py-1 border border-gray-300 w-44">
        {participante.NOM_PARTICIPANTE}
      </td>
      <td className="py-1 border border-gray-300 w-12">
        {participante.NUM_SURVIVORS}
      </td>
      <td className="py-1 border border-gray-300 w-20">
        {participante.NUM_ACIERTOS}
      </td>
      <td className="py-1 border border-gray-300 w-20">
        {participante.IMP_INVERSION}
      </td>
      {semanasVisibles.map((semana) => (
        <td
          key={`row-${participante.ID_PARTICIPANTE}-semana-${semana}`}
          className={`py-1 border border-gray-300 ${
            participante[`RES_EQ_${semana}`] === "A"
              ? "bg-green-500"
              : participante[`RES_EQ_${semana}`] === "P"
              ? "bg-red-500"
              : ""
          }`}
        >
          {participante[`NOM_EQ_${semana}`]}
        </td>
      ))}
    </tr>
  );
};
