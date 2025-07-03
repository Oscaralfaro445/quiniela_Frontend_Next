"use client";

const survivor = [
  {
    ID_PARTICIPANTE: 11,
    NOM_PARTICIPANTE: "PEDRO CANEDO",
    NUM_SURVIVORS: 9,
    NUM_ACIERTOS: 8,
    IMP_INVERSION: 0.0,
    NOM_EQ_1: "Texans",
    RES_EQ_1: "A",
    NOM_EQ_2: "Jets",
    RES_EQ_2: "A",
    NOM_EQ_3: "Seahawks",
    RES_EQ_3: "A",
    NOM_EQ_4: "Raiders",
    RES_EQ_4: "A",
    NOM_EQ_5: "Bears",
    RES_EQ_5: "A",
    NOM_EQ_6: "Buccaneers",
    RES_EQ_6: "A",
    NOM_EQ_7: "Commanders",
    RES_EQ_7: "A",
    NOM_EQ_8: "Steelers",
    RES_EQ_8: "A",
    NOM_EQ_9: "Eagles",
    RES_EQ_9: "P",
    NOM_EQ_10: "Eagles",
    RES_EQ_10: "P",
    NOM_EQ_11: "Eagles",
    RES_EQ_11: "P",
    NOM_EQ_12: "Eagles",
    RES_EQ_12: "P",
    NOM_EQ_13: "Eagles",
    RES_EQ_13: "P",
    NOM_EQ_14: "Eagles",
    RES_EQ_14: "P",
    NOM_EQ_15: "Eagles",
    RES_EQ_15: "P",
    NOM_EQ_16: "Eagles",
    RES_EQ_16: "P",
  },
  {
    ID_PARTICIPANTE: 2,
    NOM_PARTICIPANTE: "LUIS O. ALVAREZ",
    NUM_SURVIVORS: 9,
    NUM_ACIERTOS: 7,
    IMP_INVERSION: 250.0,
    NOM_EQ_1: "Chiefs",
    RES_EQ_1: "A",
    NOM_EQ_2: "Texans",
    RES_EQ_2: "A",
    NOM_EQ_3: "Bills",
    RES_EQ_3: "A",
    NOM_EQ_4: "49ers",
    RES_EQ_4: "A",
    NOM_EQ_5: "Seahawks",
    RES_EQ_5: "X",
    NOM_EQ_6: "Eagles",
    RES_EQ_6: "A",
    NOM_EQ_7: "Commanders",
    RES_EQ_7: "A",
    NOM_EQ_8: "Broncos",
    RES_EQ_8: "A",
    NOM_EQ_9: "Falcons",
    RES_EQ_9: "P",
    NOM_EQ_10: "Eagles",
    RES_EQ_10: "P",
    NOM_EQ_11: "Eagles",
    RES_EQ_11: "P",
    NOM_EQ_12: "Eagles",
    RES_EQ_12: "P",
    NOM_EQ_13: "Eagles",
    RES_EQ_13: "P",
    NOM_EQ_14: "Eagles",
    RES_EQ_14: "P",
    NOM_EQ_15: "Eagles",
    RES_EQ_15: "P",
    NOM_EQ_16: "Eagles",
    RES_EQ_16: "P",
  },
  {
    ID_PARTICIPANTE: 3,
    NOM_PARTICIPANTE: "DUSTIN CRUZ",
    NUM_SURVIVORS: 9,
    NUM_ACIERTOS: 6,
    IMP_INVERSION: 400.0,
    NOM_EQ_1: "Steelers",
    RES_EQ_1: "A",
    NOM_EQ_2: "Colts",
    RES_EQ_2: "X",
    NOM_EQ_3: "Lions",
    RES_EQ_3: "A",
    NOM_EQ_4: "Vikings",
    RES_EQ_4: "A",
    NOM_EQ_5: "Patriots",
    RES_EQ_5: "X",
    NOM_EQ_6: "Bears",
    RES_EQ_6: "A",
    NOM_EQ_7: "Broncos",
    RES_EQ_7: "A",
    NOM_EQ_8: "Cardinals",
    RES_EQ_8: "A",
    NOM_EQ_9: "Texans",
    RES_EQ_9: "X",
    NOM_EQ_10: "Eagles",
    RES_EQ_10: "P",
    NOM_EQ_11: "Eagles",
    RES_EQ_11: "P",
    NOM_EQ_12: "Eagles",
    RES_EQ_12: "P",
    NOM_EQ_13: "Eagles",
    RES_EQ_13: "P",
    NOM_EQ_14: "Eagles",
    RES_EQ_14: "P",
    NOM_EQ_15: "Eagles",
    RES_EQ_15: "P",
    NOM_EQ_16: "Eagles",
    RES_EQ_16: "P",
  },
  {
    ID_PARTICIPANTE: 8,
    NOM_PARTICIPANTE: "MARIO LOPEZ",
    NUM_SURVIVORS: 9,
    NUM_ACIERTOS: 5,
    IMP_INVERSION: 550.0,
    NOM_EQ_1: "49ers",
    RES_EQ_1: "A",
    NOM_EQ_2: "Commanders",
    RES_EQ_2: "A",
    NOM_EQ_3: "Browns",
    RES_EQ_3: "X",
    NOM_EQ_4: "Dolphins",
    RES_EQ_4: "X",
    NOM_EQ_5: "Patriots",
    RES_EQ_5: "X",
    NOM_EQ_6: "Eagles",
    RES_EQ_6: "A",
    NOM_EQ_7: "Bills",
    RES_EQ_7: "A",
    NOM_EQ_8: "Broncos",
    RES_EQ_8: "A",
    NOM_EQ_9: "Vikings",
    RES_EQ_9: "P",
    NOM_EQ_10: "Eagles",
    RES_EQ_10: "P",
    NOM_EQ_11: "Eagles",
    RES_EQ_11: "P",
    NOM_EQ_12: "Eagles",
    RES_EQ_12: "P",
    NOM_EQ_13: "Eagles",
    RES_EQ_13: "P",
    NOM_EQ_14: "Eagles",
    RES_EQ_14: "P",
    NOM_EQ_15: "Eagles",
    RES_EQ_15: "P",
    NOM_EQ_16: "Eagles",
    RES_EQ_16: "P",
  },
  {
    ID_PARTICIPANTE: 1,
    NOM_PARTICIPANTE: "EFREN AVILA",
    NUM_SURVIVORS: 9,
    NUM_ACIERTOS: 5,
    IMP_INVERSION: 550.0,
    NOM_EQ_1: "Texans",
    RES_EQ_1: "A",
    NOM_EQ_2: "Commanders",
    RES_EQ_2: "A",
    NOM_EQ_3: "Browns",
    RES_EQ_3: "X",
    NOM_EQ_4: "Rams",
    RES_EQ_4: "X",
    NOM_EQ_5: "Seahawks",
    RES_EQ_5: "X",
    NOM_EQ_6: "Eagles",
    RES_EQ_6: "A",
    NOM_EQ_7: "Bills",
    RES_EQ_7: "A",
    NOM_EQ_8: "Lions",
    RES_EQ_8: "A",
    NOM_EQ_9: "Ravens",
    RES_EQ_9: "P",
    NOM_EQ_10: "Eagles",
    RES_EQ_10: "P",
    NOM_EQ_11: "Eagles",
    RES_EQ_11: "P",
    NOM_EQ_12: "Eagles",
    RES_EQ_12: "P",
    NOM_EQ_13: "Eagles",
    RES_EQ_13: "P",
    NOM_EQ_14: "Eagles",
    RES_EQ_14: "P",
    NOM_EQ_15: "Eagles",
    RES_EQ_15: "P",
    NOM_EQ_16: "Eagles",
    RES_EQ_16: "P",
  },
  {
    ID_PARTICIPANTE: 10,
    NOM_PARTICIPANTE: "ALEJANDRO ORTEGA",
    NUM_SURVIVORS: 9,
    NUM_ACIERTOS: 4,
    IMP_INVERSION: 950.0,
    NOM_EQ_1: "Dolphins",
    RES_EQ_1: "A",
    NOM_EQ_2: "Bills",
    RES_EQ_2: "A",
    NOM_EQ_3: "Patriots",
    RES_EQ_3: "X",
    NOM_EQ_4: "Saints",
    RES_EQ_4: "X",
    NOM_EQ_5: "Vikings",
    RES_EQ_5: "A",
    NOM_EQ_6: "Commanders",
    RES_EQ_6: "X",
    NOM_EQ_7: "Ravens",
    RES_EQ_7: "A",
    NOM_EQ_8: "Cowboys",
    RES_EQ_8: "X",
    NOM_EQ_9: "Chiefs",
    RES_EQ_9: "P",
    NOM_EQ_10: "Eagles",
    RES_EQ_10: "P",
    NOM_EQ_11: "Eagles",
    RES_EQ_11: "P",
    NOM_EQ_12: "Eagles",
    RES_EQ_12: "P",
    NOM_EQ_13: "Eagles",
    RES_EQ_13: "P",
    NOM_EQ_14: "Eagles",
    RES_EQ_14: "P",
    NOM_EQ_15: "Eagles",
    RES_EQ_15: "P",
    NOM_EQ_16: "Eagles",
    RES_EQ_16: "P",
  },
  {
    ID_PARTICIPANTE: 5,
    NOM_PARTICIPANTE: "GUSTAVO SOLIS",
    NUM_SURVIVORS: 9,
    NUM_ACIERTOS: 4,
    IMP_INVERSION: 950.0,
    NOM_EQ_1: "Bengals",
    RES_EQ_1: "X",
    NOM_EQ_2: "Eagles",
    RES_EQ_2: "X",
    NOM_EQ_3: "Bills",
    RES_EQ_3: "A",
    NOM_EQ_4: "49ers",
    RES_EQ_4: "A",
    NOM_EQ_5: "Seahawks",
    RES_EQ_5: "X",
    NOM_EQ_6: "Falcons",
    RES_EQ_6: "A",
    NOM_EQ_7: "Commanders",
    RES_EQ_7: "A",
    NOM_EQ_8: "Ravens",
    RES_EQ_8: "X",
    NOM_EQ_9: "Chiefs",
    RES_EQ_9: "P",
    NOM_EQ_10: "Eagles",
    RES_EQ_10: "P",
    NOM_EQ_11: "Eagles",
    RES_EQ_11: "P",
    NOM_EQ_12: "Eagles",
    RES_EQ_12: "P",
    NOM_EQ_13: "Eagles",
    RES_EQ_13: "P",
    NOM_EQ_14: "Eagles",
    RES_EQ_14: "P",
    NOM_EQ_15: "Eagles",
    RES_EQ_15: "P",
    NOM_EQ_16: "Eagles",
    RES_EQ_16: "P",
  },
  {
    ID_PARTICIPANTE: 14,
    NOM_PARTICIPANTE: "HUMBERTO LOPEZ",
    NUM_SURVIVORS: 9,
    NUM_ACIERTOS: 4,
    IMP_INVERSION: 850.0,
    NOM_EQ_1: "Bears",
    RES_EQ_1: "A",
    NOM_EQ_2: "Colts",
    RES_EQ_2: "X",
    NOM_EQ_3: "Buccaneers",
    RES_EQ_3: "X",
    NOM_EQ_4: "Jets",
    RES_EQ_4: "X",
    NOM_EQ_5: "Broncos",
    RES_EQ_5: "A",
    NOM_EQ_6: "Eagles",
    RES_EQ_6: "A",
    NOM_EQ_7: "Steelers",
    RES_EQ_7: "A",
    NOM_EQ_8: "Dolphins",
    RES_EQ_8: "X",
    NOM_EQ_9: "Ravens",
    RES_EQ_9: "P",
    NOM_EQ_10: "Eagles",
    RES_EQ_10: "P",
    NOM_EQ_11: "Eagles",
    RES_EQ_11: "P",
    NOM_EQ_12: "Eagles",
    RES_EQ_12: "P",
    NOM_EQ_13: "Eagles",
    RES_EQ_13: "P",
    NOM_EQ_14: "Eagles",
    RES_EQ_14: "P",
    NOM_EQ_15: "Eagles",
    RES_EQ_15: "P",
    NOM_EQ_16: "Eagles",
    RES_EQ_16: "P",
  },
  {
    ID_PARTICIPANTE: 12,
    NOM_PARTICIPANTE: "DIEGO OJEDA",
    NUM_SURVIVORS: 5,
    NUM_ACIERTOS: 4,
    IMP_INVERSION: 0.0,
    NOM_EQ_1: "Lions",
    RES_EQ_1: "A",
    NOM_EQ_2: "Chargers",
    RES_EQ_2: "A",
    NOM_EQ_3: "Chiefs",
    RES_EQ_3: "A",
    NOM_EQ_4: "Vikings",
    RES_EQ_4: "A",
    NOM_EQ_5: "49ers",
    RES_EQ_5: "X",
    NOM_EQ_6: " ",
    RES_EQ_6: " ",
    NOM_EQ_7: " ",
    RES_EQ_7: " ",
    NOM_EQ_8: " ",
    RES_EQ_8: " ",
    NOM_EQ_9: " ",
    RES_EQ_9: " ",
    NOM_EQ_10: "Eagles",
    RES_EQ_10: "P",
    NOM_EQ_11: "Eagles",
    RES_EQ_11: "P",
    NOM_EQ_12: "Eagles",
    RES_EQ_12: "P",
    NOM_EQ_13: "Eagles",
    RES_EQ_13: "P",
    NOM_EQ_14: "Eagles",
    RES_EQ_14: "P",
    NOM_EQ_15: "Eagles",
    RES_EQ_15: "P",
    NOM_EQ_16: "Eagles",
    RES_EQ_16: "P",
  },
  {
    ID_PARTICIPANTE: 13,
    NOM_PARTICIPANTE: "DAVID ALVARADO",
    NUM_SURVIVORS: 3,
    NUM_ACIERTOS: 2,
    IMP_INVERSION: 0.0,
    NOM_EQ_1: "Lions",
    RES_EQ_1: "A",
    NOM_EQ_2: "Chargers",
    RES_EQ_2: "A",
    NOM_EQ_3: "Texans",
    RES_EQ_3: "X",
    NOM_EQ_4: " ",
    RES_EQ_4: " ",
    NOM_EQ_5: " ",
    RES_EQ_5: " ",
    NOM_EQ_6: " ",
    RES_EQ_6: " ",
    NOM_EQ_7: " ",
    RES_EQ_7: " ",
    NOM_EQ_8: " ",
    RES_EQ_8: " ",
    NOM_EQ_9: " ",
    RES_EQ_9: " ",
    NOM_EQ_10: "Eagles",
    RES_EQ_10: "P",
    NOM_EQ_11: "Eagles",
    RES_EQ_11: "P",
    NOM_EQ_12: "Eagles",
    RES_EQ_12: "P",
    NOM_EQ_13: "Eagles",
    RES_EQ_13: "P",
    NOM_EQ_14: "Eagles",
    RES_EQ_14: "P",
    NOM_EQ_15: "Eagles",
    RES_EQ_15: "P",
    NOM_EQ_16: "Eagles",
    RES_EQ_16: "P",
  },
  {
    ID_PARTICIPANTE: 6,
    NOM_PARTICIPANTE: "HECTOR ALVAREZ",
    NUM_SURVIVORS: 3,
    NUM_ACIERTOS: 1,
    IMP_INVERSION: 150.0,
    NOM_EQ_1: "Ravens",
    RES_EQ_1: "X",
    NOM_EQ_2: "Cardinals",
    RES_EQ_2: "A",
    NOM_EQ_3: "Buccaneers",
    RES_EQ_3: "X",
    NOM_EQ_4: " ",
    RES_EQ_4: " ",
    NOM_EQ_5: " ",
    RES_EQ_5: " ",
    NOM_EQ_6: " ",
    RES_EQ_6: " ",
    NOM_EQ_7: " ",
    RES_EQ_7: " ",
    NOM_EQ_8: " ",
    RES_EQ_8: " ",
    NOM_EQ_9: " ",
    RES_EQ_9: " ",
    NOM_EQ_10: "Eagles",
    RES_EQ_10: "P",
    NOM_EQ_11: "Eagles",
    RES_EQ_11: "P",
    NOM_EQ_12: "Eagles",
    RES_EQ_12: "P",
    NOM_EQ_13: "Eagles",
    RES_EQ_13: "P",
    NOM_EQ_14: "Eagles",
    RES_EQ_14: "P",
    NOM_EQ_15: "Eagles",
    RES_EQ_15: "P",
    NOM_EQ_16: "Eagles",
    RES_EQ_16: "P",
  },
  {
    ID_PARTICIPANTE: 7,
    NOM_PARTICIPANTE: "JONATAN PARRA",
    NUM_SURVIVORS: 3,
    NUM_ACIERTOS: 1,
    IMP_INVERSION: 150.0,
    NOM_EQ_1: "49ers",
    RES_EQ_1: "A",
    NOM_EQ_2: "Eagles",
    RES_EQ_2: "X",
    NOM_EQ_3: "Browns",
    RES_EQ_3: "X",
    NOM_EQ_4: " ",
    RES_EQ_4: " ",
    NOM_EQ_5: " ",
    RES_EQ_5: " ",
    NOM_EQ_6: " ",
    RES_EQ_6: " ",
    NOM_EQ_7: " ",
    RES_EQ_7: " ",
    NOM_EQ_8: " ",
    RES_EQ_8: " ",
    NOM_EQ_9: " ",
    RES_EQ_9: " ",
    NOM_EQ_10: "Eagles",
    RES_EQ_10: "P",
    NOM_EQ_11: "Eagles",
    RES_EQ_11: "P",
    NOM_EQ_12: "Eagles",
    RES_EQ_12: "P",
    NOM_EQ_13: "Eagles",
    RES_EQ_13: "P",
    NOM_EQ_14: "Eagles",
    RES_EQ_14: "P",
    NOM_EQ_15: "Eagles",
    RES_EQ_15: "P",
    NOM_EQ_16: "Eagles",
    RES_EQ_16: "P",
  },
  {
    ID_PARTICIPANTE: 4,
    NOM_PARTICIPANTE: "KAREN PEREZ",
    NUM_SURVIVORS: 2,
    NUM_ACIERTOS: 1,
    IMP_INVERSION: 0.0,
    NOM_EQ_1: "Buccaneers",
    RES_EQ_1: "A",
    NOM_EQ_2: "Jaguars",
    RES_EQ_2: "X",
    NOM_EQ_3: " ",
    RES_EQ_3: " ",
    NOM_EQ_4: " ",
    RES_EQ_4: " ",
    NOM_EQ_5: " ",
    RES_EQ_5: " ",
    NOM_EQ_6: " ",
    RES_EQ_6: " ",
    NOM_EQ_7: " ",
    RES_EQ_7: " ",
    NOM_EQ_8: " ",
    RES_EQ_8: " ",
    NOM_EQ_9: " ",
    RES_EQ_9: " ",
    NOM_EQ_10: "Eagles",
    RES_EQ_10: "P",
    NOM_EQ_11: "Eagles",
    RES_EQ_11: "P",
    NOM_EQ_12: "Eagles",
    RES_EQ_12: "P",
    NOM_EQ_13: "Eagles",
    RES_EQ_13: "P",
    NOM_EQ_14: "Eagles",
    RES_EQ_14: "P",
    NOM_EQ_15: "Eagles",
    RES_EQ_15: "P",
    NOM_EQ_16: "Eagles",
    RES_EQ_16: "P",
  },
  {
    ID_PARTICIPANTE: 9,
    NOM_PARTICIPANTE: "NATALIA CASTILLO",
    NUM_SURVIVORS: 1,
    NUM_ACIERTOS: 0,
    IMP_INVERSION: 0.0,
    NOM_EQ_1: "Bengals",
    RES_EQ_1: "X",
    NOM_EQ_2: " ",
    RES_EQ_2: " ",
    NOM_EQ_3: " ",
    RES_EQ_3: " ",
    NOM_EQ_4: " ",
    RES_EQ_4: " ",
    NOM_EQ_5: " ",
    RES_EQ_5: " ",
    NOM_EQ_6: " ",
    RES_EQ_6: " ",
    NOM_EQ_7: " ",
    RES_EQ_7: " ",
    NOM_EQ_8: " ",
    RES_EQ_8: " ",
    NOM_EQ_9: " ",
    RES_EQ_9: " ",
    NOM_EQ_10: "Eagles",
    RES_EQ_10: "P",
    NOM_EQ_11: "Eagles",
    RES_EQ_11: "P",
    NOM_EQ_12: "Eagles",
    RES_EQ_12: "P",
    NOM_EQ_13: "Eagles",
    RES_EQ_13: "P",
    NOM_EQ_14: "Eagles",
    RES_EQ_14: "P",
    NOM_EQ_15: "Eagles",
    RES_EQ_15: "P",
    NOM_EQ_16: "Eagles",
    RES_EQ_16: "P",
  },
];

import { Icon } from "@/components/shared/icon/icon";
import { useState } from "react";

export default function SurvivorTable() {
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
    <div className="bg-white shadow-md rounded-lg overflow-x-auto py-32 px-2">
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

      <div className="flex justify-center mt-10 space-x-10">
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
