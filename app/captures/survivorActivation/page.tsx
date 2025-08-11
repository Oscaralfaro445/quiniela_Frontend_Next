"use client";

import useGetSurvivorStatus from "@/hooks/survivorActivation/queries/useGetSurvivorStatus";
import usePostSurvivorActivation from "@/hooks/survivorActivation/mutations/usePostSurvicorActivation";
import { MainContainer } from "@/components/shared/mainContainer/MainContainer";
import { SectionGrid } from "@/components/shared/sectionGrid/SectionGrid";
import { TextBody } from "@/components/shared/text/TextBody";
import { Title } from "@/components/shared/text/Title";
import { Button } from "@/components/shared/button/Button";

export default function SurvivorActivationPage() {
  const survivorStatus = useGetSurvivorStatus();
  const survivorActivation = usePostSurvivorActivation();
  const survivorData = survivorStatus?.data?.data[0];
  // console.log(survivorData);

  const handleSurvivorActivation = () => {
    survivorActivation.mutate({
      idEquipo: survivorData.idEquipoSuv,
      bResucita: !survivorData.bResucita,
    });
  };

  return (
    <MainContainer>
      <SectionGrid>
        <div className="grid md:flex w-full gap-4 justify-center md:justify-between items-center">
          <div className="grid gap-2">
            <Title title="Registro de Activación de Survivor" />
            <TextBody text="Aquí podrás darle una segunda oportunidad a tu survivor" />
          </div>

          <div className="flex justify-center items-center border-2 border-blue-600 rounded-2xl">
            <p className="px-2 py-1 text-sm font-semibold text-blue-700">
              NFL temporada 2025
            </p>
          </div>
        </div>
      </SectionGrid>

      {survivorData && (
        <SectionGrid>
          <div className="grid gap-2">
            <Title title={survivorData.nomEquipo} color="danger" />
            <TextBody text={` $${survivorData.costoQuiniela}`} color="danger" />
          </div>
          <Button
            type="submit"
            title={`${
              survivorData.bResucita ? "Activar Survivor" : "Cancelar"
            }`}
            onClick={handleSurvivorActivation}
          />
        </SectionGrid>
      )}
    </MainContainer>
  );
}
