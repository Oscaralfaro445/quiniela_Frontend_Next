"use client";

import { useState } from "react";
import { Icon } from "@/components/shared/icon/Icon";
import { Card } from "@/components/shared/card/Card";
import { Button } from "@/components/shared/button/Button";
import { MainContainer } from "@/components/shared/mainContainer/MainContainer";
import { SectionGrid } from "@/components/shared/sectionGrid/SectionGrid";
import { ProtectedRoute } from "@/components/shared/protectedRoute/ProtectedRoute";

export default function PeriodOpeningPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedCount, setProcessedCount] = useState(15);
  const [processStatus, setProcessStatus] = useState<
    "idle" | "running" | "completed" | "error"
  >("idle");

  // Simulación de errores de ejemplo
  const [errors] = useState([
    { type: "warning", message: "El proceso ya fue ejecutado anteriormente" },
    { type: "error", message: "Existe inconsistencia en la información" },
    { type: "info", message: "El período se encuentra abierto" },
  ]);

  const handleExecuteProcess = async () => {
    setIsProcessing(true);
    setProcessStatus("running");

    // Simulación de proceso
    setTimeout(() => {
      setProcessedCount((prev) => prev + 5);
      setProcessStatus("completed");
      setIsProcessing(false);
    }, 3000);
  };

  /* const getErrorIcon = (type: string) => {
    switch (type) {
      case "error":
        return <Icon name="check" className="h-4 w-4 text-red-500" />;
      case "warning":
        return <Icon name="check" className="h-4 w-4 text-red-500" />;
      case "info":
        return <Icon name="check" className="h-4 w-4 text-red-500" />;
      default:
        return <Icon name="check" className="h-4 w-4 text-red-500" />;
    }
  };

  const getErrorVariant = (type: string) => {
    switch (type) {
      case "error":
        return "destructive";
      case "warning":
        return "default";
      case "info":
        return "default";
      default:
        return "default";
    }
  }; */

  return (
    <ProtectedRoute>
      <MainContainer>
        <SectionGrid>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Proceso de Carga de Información
          </h2>
          <p className="text-gray-600">
            Gestiona la carga y procesamiento de datos de participantes y
            quinielas.
          </p>
        </SectionGrid>

        <SectionGrid>
          <Card>
            <div>
              <div className="flex items-center space-x-2">
                <Icon name="database" className="h-5 w-5 text-blue-700" />
                <span>Estado del Proceso</span>
              </div>
              <div>
                Ejecuta el proceso de carga para actualizar la información de
                participantes
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button
                    type="button"
                    title={isProcessing ? "Detener Proceso" : "Iniciar Proceso"}
                    icon={isProcessing ? "loader" : "play"}
                    onClick={handleExecuteProcess}
                    disabled={isProcessing}
                  />

                  {processStatus === "completed" && (
                    <div className="text-green-700 border-green-700">
                      <Icon name="check" />
                      Completado
                    </div>
                  )}
                </div>

                <div className="text-right">
                  <div className="text-2xl font-bold text-red-600">
                    Participantes procesados: {processedCount}
                  </div>
                  <div className="text-sm text-gray-500">
                    Última actualización: {new Date().toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {errors.length > 0 && (
            <Card>
              <div>
                <div className="flex items-center space-x-2">
                  <Icon
                    name="alert-triangle"
                    className="h-5 w-5 text-yellow-600"
                  />
                  <span>Mensajes del Sistema</span>
                </div>
                <div>
                  En caso de existir errores de negocio se mostrarían de la
                  siguiente manera
                </div>
              </div>
              <div className="space-y-3">
                {/* {errors.map((error, index) => (
                  <Alert
                  key={index}
                  variant={getErrorVariant(error.type) as any}
                  >
                  <div className="flex items-center space-x-2">
                  {getErrorIcon(error.type)}
                  <AlertDescription className="flex-1">
                  {error.message}
                  </AlertDescription>
                  </div>
                  </Alert>
                  ))} */}
              </div>
            </Card>
          )}

          <Card>
            <div>
              <div className="flex items-center space-x-2">
                <Icon name="settings" className="h-5 w-5 text-blue-700" />
                <span>Proceso Secundario</span>
              </div>
              <div>
                Proceso adicional de validación y sincronización de datos
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <Button type="button" title="EJECUTAR" icon="play" />

                <div className="text-sm text-gray-500">
                  Finalmente, si existe un error de sistema se mostrará el
                  mensaje correspondiente
                </div>
              </div>
            </div>
          </Card>
        </SectionGrid>
      </MainContainer>
    </ProtectedRoute>
  );
}
