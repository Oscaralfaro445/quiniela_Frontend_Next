import { Card } from "@/components/shared/card/Card";
import { Icon } from "@/components/shared/icon/Icon";

interface BusinessErrorPanelProps {
  errorNeg: { errorNeg: string }[];
}

export const BusinessErrorPanel = ({ errorNeg }: BusinessErrorPanelProps) => {
  return (
    <div className="w-full max-w-[1280px] mx-auto px-10 py-8 gap-4">
      <Card>
        <div>
          <div className="flex gap-2 items-center">
            <Icon className="h-5 w-5 text-red-600" name="octagon-alert" />
            <p className="text-neutral-800">Mensajes del Sistema</p>
          </div>

          <p className="text-neutral-600">
            En caso de existir errores de negocio se mostrarán a continuación:
          </p>
        </div>

        <div className="grid gap-2">
          {errorNeg.map((error: { errorNeg: string }, index: number) => (
            <div key={index} className="flex justify-between items-center">
              <div className="flex gap-2">
                <p>{`${index + 1} .- `}</p>
                <p>{error.errorNeg}</p>
              </div>

              <Icon name="alert-triangle" className="h-5 w-5 text-yellow-600" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
