import { ProgressBar } from "../shared/progressBar/ProgressBar";
import { Card } from "../shared/card/Card";

interface QuinielaProgressBarCardProps {
  title?: string;
  description?: string;
  max: number;
  value: number;
}

export const QuinielaProgressBarCard = ({
  title,
  description,
  max,
  value,
}: QuinielaProgressBarCardProps) => {
  return (
    <Card>
      <div className="flex flex-col gap-2">
        <p className="text-lg text-blue-600 font-semibold">{title}</p>

        <div className="flex gap-2 justify-between">
          <p className=" text-sm text-neutral-600">{description}</p>

          <p className="text-sm">{`${value}/${max}`}</p>
        </div>
      </div>
      <ProgressBar value={value} max={max} />
    </Card>
  );
};
