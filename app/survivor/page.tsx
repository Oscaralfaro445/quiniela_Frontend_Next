"use client";

import { Icon } from "@/components/shared/icon/Icon";
import { useState } from "react";

export default function SurvivorPage() {
  const survivor = [
    {
      ID_PARTICIPANTE: 11,
      NOM_PARTICIPANTE: "PEDRO CANEDO",
      NUM_SUVIVORS: 12,
      NUM_ACIERTOS: 11,
      IMP_INVERSION: 0,
      NOM_EQ_1: "Texans ",
      NOM_EQ_2: "Jets ",
      NOM_EQ_3: "Seahawks ",
      NOM_EQ_4: "Raiders ",
      NOM_EQ_5: "Bears ",
      NOM_EQ_6: "Buccaneers ",
      NOM_EQ_7: "Commanders ",
      NOM_EQ_8: "Steelers ",
      NOM_EQ_9: "Eagles ",
      NOM_EQ_10: "Vikings ",
      NOM_EQ_11: "Lions ",
      NOM_EQ_12: "Chiefs(P)",
      NOM_EQ_13: " ",
      NOM_EQ_14: " ",
      NOM_EQ_15: " ",
      NOM_EQ_16: " ",
      NOM_EQ_17: " ",
    },
    {
      ID_PARTICIPANTE: 2,
      NOM_PARTICIPANTE: "LUIS O. ALVAREZ",
      NUM_SUVIVORS: 12,
      NUM_ACIERTOS: 10,
      IMP_INVERSION: 250,
      NOM_EQ_1: "Chiefs ",
      NOM_EQ_2: "Texans ",
      NOM_EQ_3: "Bills ",
      NOM_EQ_4: "49ers ",
      NOM_EQ_5: "Seahawks(X)",
      NOM_EQ_6: "Eagles ",
      NOM_EQ_7: "Commanders ",
      NOM_EQ_8: "Broncos ",
      NOM_EQ_9: "Falcons ",
      NOM_EQ_10: "Ravens ",
      NOM_EQ_11: "Vikings ",
      NOM_EQ_12: "Dolphins(P)",
      NOM_EQ_13: " ",
      NOM_EQ_14: " ",
      NOM_EQ_15: " ",
      NOM_EQ_16: " ",
      NOM_EQ_17: " ",
    },
    {
      ID_PARTICIPANTE: 8,
      NOM_PARTICIPANTE: "MARIO LOPEZ",
      NUM_SUVIVORS: 12,
      NUM_ACIERTOS: 8,
      IMP_INVERSION: 550,
      NOM_EQ_1: "49ers ",
      NOM_EQ_2: "Commanders ",
      NOM_EQ_3: "Browns(X)",
      NOM_EQ_4: "Dolphins(X)",
      NOM_EQ_5: "Patriots(X)",
      NOM_EQ_6: "Eagles ",
      NOM_EQ_7: "Bills ",
      NOM_EQ_8: "Broncos ",
      NOM_EQ_9: "Vikings ",
      NOM_EQ_10: "Chiefs ",
      NOM_EQ_11: "Texans ",
      NOM_EQ_12: "Lions(P)",
      NOM_EQ_13: " ",
      NOM_EQ_14: " ",
      NOM_EQ_15: " ",
      NOM_EQ_16: " ",
      NOM_EQ_17: " ",
    },
    {
      ID_PARTICIPANTE: 1,
      NOM_PARTICIPANTE: "EFREN AVILA",
      NUM_SUVIVORS: 12,
      NUM_ACIERTOS: 8,
      IMP_INVERSION: 550,
      NOM_EQ_1: "Texans ",
      NOM_EQ_2: "Commanders ",
      NOM_EQ_3: "Browns(X)",
      NOM_EQ_4: "Rams(X)",
      NOM_EQ_5: "Seahawks(X)",
      NOM_EQ_6: "Eagles ",
      NOM_EQ_7: "Bills ",
      NOM_EQ_8: "Lions ",
      NOM_EQ_9: "Ravens ",
      NOM_EQ_10: "Chargers ",
      NOM_EQ_11: "Dolphins ",
      NOM_EQ_12: "Buccaneers(P)",
      NOM_EQ_13: " ",
      NOM_EQ_14: " ",
      NOM_EQ_15: " ",
      NOM_EQ_16: " ",
      NOM_EQ_17: " ",
    },
    {
      ID_PARTICIPANTE: 10,
      NOM_PARTICIPANTE: "ALEJANDRO ORTEGA",
      NUM_SUVIVORS: 12,
      NUM_ACIERTOS: 7,
      IMP_INVERSION: 950,
      NOM_EQ_1: "Dolphins ",
      NOM_EQ_2: "Bills ",
      NOM_EQ_3: "Patriots(X)",
      NOM_EQ_4: "Saints(X)",
      NOM_EQ_5: "Vikings ",
      NOM_EQ_6: "Commanders(X)",
      NOM_EQ_7: "Ravens ",
      NOM_EQ_8: "Cowboys(X)",
      NOM_EQ_9: "Chiefs ",
      NOM_EQ_10: "Steelers ",
      NOM_EQ_11: "Chargers ",
      NOM_EQ_12: "Packers(P)",
      NOM_EQ_13: " ",
      NOM_EQ_14: " ",
      NOM_EQ_15: " ",
      NOM_EQ_16: " ",
      NOM_EQ_17: " ",
    },
    {
      ID_PARTICIPANTE: 5,
      NOM_PARTICIPANTE: "GUSTAVO SOLIS",
      NUM_SUVIVORS: 12,
      NUM_ACIERTOS: 7,
      IMP_INVERSION: 950,
      NOM_EQ_1: "Bengals(X)",
      NOM_EQ_2: "Eagles(X)",
      NOM_EQ_3: "Bills ",
      NOM_EQ_4: "49ers ",
      NOM_EQ_5: "Seahawks(X)",
      NOM_EQ_6: "Falcons ",
      NOM_EQ_7: "Commanders ",
      NOM_EQ_8: "Ravens(X)",
      NOM_EQ_9: "Chiefs ",
      NOM_EQ_10: "Vikings ",
      NOM_EQ_11: "Lions ",
      NOM_EQ_12: "Dolphins(P)",
      NOM_EQ_13: " ",
      NOM_EQ_14: " ",
      NOM_EQ_15: " ",
      NOM_EQ_16: " ",
      NOM_EQ_17: " ",
    },
    {
      ID_PARTICIPANTE: 14,
      NOM_PARTICIPANTE: "HUMBERTO LOPEZ",
      NUM_SUVIVORS: 10,
      NUM_ACIERTOS: 5,
      IMP_INVERSION: 850,
      NOM_EQ_1: "Bears ",
      NOM_EQ_2: "Colts(X)",
      NOM_EQ_3: "Buccaneers(X)",
      NOM_EQ_4: "Jets(X)",
      NOM_EQ_5: "Broncos ",
      NOM_EQ_6: "Eagles ",
      NOM_EQ_7: "Steelers ",
      NOM_EQ_8: "Dolphins(X)",
      NOM_EQ_9: "Ravens ",
      NOM_EQ_10: "Giants(X)",
      NOM_EQ_11: " ",
      NOM_EQ_12: " ",
      NOM_EQ_13: " ",
      NOM_EQ_14: " ",
      NOM_EQ_15: " ",
      NOM_EQ_16: " ",
      NOM_EQ_17: " ",
    },
    {
      ID_PARTICIPANTE: 3,
      NOM_PARTICIPANTE: "DUSTIN CRUZ",
      NUM_SUVIVORS: 9,
      NUM_ACIERTOS: 6,
      IMP_INVERSION: 400,
      NOM_EQ_1: "Steelers ",
      NOM_EQ_2: "Colts(X)",
      NOM_EQ_3: "Lions ",
      NOM_EQ_4: "Vikings ",
      NOM_EQ_5: "Patriots(X)",
      NOM_EQ_6: "Bears ",
      NOM_EQ_7: "Broncos ",
      NOM_EQ_8: "Cardinals ",
      NOM_EQ_9: "Texans(X)",
      NOM_EQ_10: " ",
      NOM_EQ_11: " ",
      NOM_EQ_12: " ",
      NOM_EQ_13: " ",
      NOM_EQ_14: " ",
      NOM_EQ_15: " ",
      NOM_EQ_16: " ",
      NOM_EQ_17: " ",
    },
    {
      ID_PARTICIPANTE: 12,
      NOM_PARTICIPANTE: "DIEGO OJEDA",
      NUM_SUVIVORS: 5,
      NUM_ACIERTOS: 4,
      IMP_INVERSION: 0,
      NOM_EQ_1: "Lions ",
      NOM_EQ_2: "Chargers ",
      NOM_EQ_3: "Chiefs ",
      NOM_EQ_4: "Vikings ",
      NOM_EQ_5: "49ers(X)",
      NOM_EQ_6: " ",
      NOM_EQ_7: " ",
      NOM_EQ_8: " ",
      NOM_EQ_9: " ",
      NOM_EQ_10: " ",
      NOM_EQ_11: " ",
      NOM_EQ_12: " ",
      NOM_EQ_13: " ",
      NOM_EQ_14: " ",
      NOM_EQ_15: " ",
      NOM_EQ_16: " ",
      NOM_EQ_17: " ",
    },
    {
      ID_PARTICIPANTE: 13,
      NOM_PARTICIPANTE: "DAVID ALVARADO",
      NUM_SUVIVORS: 3,
      NUM_ACIERTOS: 2,
      IMP_INVERSION: 0,
      NOM_EQ_1: "Lions ",
      NOM_EQ_2: "Chargers ",
      NOM_EQ_3: "Texans(X)",
      NOM_EQ_4: " ",
      NOM_EQ_5: " ",
      NOM_EQ_6: " ",
      NOM_EQ_7: " ",
      NOM_EQ_8: " ",
      NOM_EQ_9: " ",
      NOM_EQ_10: " ",
      NOM_EQ_11: " ",
      NOM_EQ_12: " ",
      NOM_EQ_13: " ",
      NOM_EQ_14: " ",
      NOM_EQ_15: " ",
      NOM_EQ_16: " ",
      NOM_EQ_17: " ",
    },
    {
      ID_PARTICIPANTE: 6,
      NOM_PARTICIPANTE: "HECTOR ALVAREZ",
      NUM_SUVIVORS: 3,
      NUM_ACIERTOS: 1,
      IMP_INVERSION: 150,
      NOM_EQ_1: "Ravens(X)",
      NOM_EQ_2: "Cardinals ",
      NOM_EQ_3: "Buccaneers(X)",
      NOM_EQ_4: " ",
      NOM_EQ_5: " ",
      NOM_EQ_6: " ",
      NOM_EQ_7: " ",
      NOM_EQ_8: " ",
      NOM_EQ_9: " ",
      NOM_EQ_10: " ",
      NOM_EQ_11: " ",
      NOM_EQ_12: " ",
      NOM_EQ_13: " ",
      NOM_EQ_14: " ",
      NOM_EQ_15: " ",
      NOM_EQ_16: " ",
      NOM_EQ_17: " ",
    },
    {
      ID_PARTICIPANTE: 7,
      NOM_PARTICIPANTE: "JONATAN PARRA",
      NUM_SUVIVORS: 3,
      NUM_ACIERTOS: 1,
      IMP_INVERSION: 150,
      NOM_EQ_1: "49ers ",
      NOM_EQ_2: "Eagles(X)",
      NOM_EQ_3: "Browns(X)",
      NOM_EQ_4: " ",
      NOM_EQ_5: " ",
      NOM_EQ_6: " ",
      NOM_EQ_7: " ",
      NOM_EQ_8: " ",
      NOM_EQ_9: " ",
      NOM_EQ_10: " ",
      NOM_EQ_11: " ",
      NOM_EQ_12: " ",
      NOM_EQ_13: " ",
      NOM_EQ_14: " ",
      NOM_EQ_15: " ",
      NOM_EQ_16: " ",
      NOM_EQ_17: " ",
    },
    {
      ID_PARTICIPANTE: 4,
      NOM_PARTICIPANTE: "KAREN PEREZ",
      NUM_SUVIVORS: 2,
      NUM_ACIERTOS: 1,
      IMP_INVERSION: 0,
      NOM_EQ_1: "Buccaneers ",
      NOM_EQ_2: "Jaguars(X)",
      NOM_EQ_3: " ",
      NOM_EQ_4: " ",
      NOM_EQ_5: " ",
      NOM_EQ_6: " ",
      NOM_EQ_7: " ",
      NOM_EQ_8: " ",
      NOM_EQ_9: " ",
      NOM_EQ_10: " ",
      NOM_EQ_11: " ",
      NOM_EQ_12: " ",
      NOM_EQ_13: " ",
      NOM_EQ_14: " ",
      NOM_EQ_15: " ",
      NOM_EQ_16: " ",
      NOM_EQ_17: " ",
    },
    {
      ID_PARTICIPANTE: 9,
      NOM_PARTICIPANTE: "NATALIA CASTILLO",
      NUM_SUVIVORS: 1,
      NUM_ACIERTOS: 0,
      IMP_INVERSION: 0,
      NOM_EQ_1: "Bengals(X)",
      NOM_EQ_2: " ",
      NOM_EQ_3: " ",
      NOM_EQ_4: " ",
      NOM_EQ_5: " ",
      NOM_EQ_6: " ",
      NOM_EQ_7: " ",
      NOM_EQ_8: " ",
      NOM_EQ_9: " ",
      NOM_EQ_10: " ",
      NOM_EQ_11: " ",
      NOM_EQ_12: " ",
      NOM_EQ_13: " ",
      NOM_EQ_14: " ",
      NOM_EQ_15: " ",
      NOM_EQ_16: " ",
      NOM_EQ_17: " ",
    },
  ];

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
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Resumen de Quiniela
        </h2>
        <p className="text-gray-600">
          Vista general de las selecciones de los participantes por semana.
        </p>
      </div>

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
