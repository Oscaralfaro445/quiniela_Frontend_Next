"use client";

import { useEffect, useState } from "react";
import useGetSurvivorReport from "@/hooks/survivorReport/queries/useGetSurvivorReport";
import { Icon } from "@/components/shared/icon/Icon";
import { MainContainer } from "@/components/shared/mainContainer/MainContainer";
import { SectionGrid } from "@/components/shared/sectionGrid/SectionGrid";
import { TextBody } from "@/components/shared/text/TextBody";
import { Title } from "@/components/shared/text/Title";
import { Card } from "@/components/shared/card/Card";
import Link from "next/link";
import { Button } from "@/components/shared/button/Button";

export default function SurvivorPage() {
  const survivor = useGetSurvivorReport();
  const survivorData = survivor?.data?.data;
  console.log("Survivor:", survivor);
  console.log("Survivor Data:", survivorData);

  const semanas = Object.keys(survivorData?.[0] || {})
    .filter((key) => key.startsWith("NOM_EQ_"))
    .map((key) => parseInt(key.split("_")[2]));

  console.log("semanas", semanas);

  const [rango, setRango] = useState({
    inicio: 0,
    fin: 0,
  });

  useEffect(() => {
    if (survivor.isSuccess) {
      setRango({
        inicio: semanas.length - 6,
        fin: semanas.length,
      });
    }
  }, [survivor.isSuccess, semanas.length]);

  const semanasVisibles = semanas.slice(rango.inicio, rango.fin);

  const finalSemana = () => {
    if (rango.fin < semanas.length) {
      setRango({ inicio: semanas.length - 6, fin: semanas.length });
    }
  };

  const avanzarSemana = () => {
    if (rango.fin < semanas.length) {
      setRango({ inicio: rango.inicio + 1, fin: rango.fin + 1 });
    }
  };

  const inicioSemana = () => {
    if (rango.inicio > 0) {
      setRango({ inicio: (rango.inicio = 0), fin: rango.inicio + 6 });
    }
  };

  const retrocederSemana = () => {
    if (rango.inicio > 0) {
      setRango({ inicio: rango.inicio - 1, fin: rango.fin - 1 });
    }
  };

  return (
    <MainContainer>
      <SectionGrid>
        <div className="grid md:flex w-full gap-4 justify-center md:justify-between items-center">
          <div className="grid gap-2">
            <Title title="Reporte de Survivor" />
            <TextBody text="Vista general de las selecciones de los participantes por semana." />
          </div>
        </div>
      </SectionGrid>

      <SectionGrid>
        <Card>
          <p>Progeso de participantes</p>

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
            {survivorData && (
              <tbody className="text-center text-gray-700 text-sm">
                {survivorData?.map(
                  (participante: any) => (
                    console.log("Participante:", participante),
                    (
                      <SurvivorTableRow
                        key={participante.ID_PARTICIPANTE}
                        participante={participante}
                        semanasVisibles={semanasVisibles}
                      />
                    )
                  )
                )}
              </tbody>
            )}
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
                rango.fin >= semanas.length
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              <Icon name="chevron-right" />
            </button>

            <button
              onClick={finalSemana}
              disabled={rango.fin >= semanas.length}
              className={`px-4 py-2 bg-blue-600 text-white rounded ${
                rango.fin >= semanas.length
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              <Icon name="chevron-right" />
            </button>
          </div>
        </Card>
      </SectionGrid>

      <SectionGrid>
        <div className="grid sm:flex w-full gap-4 justify-center items-center">
          <Link href="/dashboard">
            <Button type="button" title="Volver al Dashboard" theme="normal" />
          </Link>

          <Link href="/positionQuery">
            <Button type="button" title="Ver Clasificación" />
          </Link>
        </div>
      </SectionGrid>
    </MainContainer>
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
