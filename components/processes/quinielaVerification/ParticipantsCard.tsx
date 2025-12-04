import { Card } from "@/components/shared/card/Card";
import { Icon } from "@/components/shared/icon/Icon";
import { IconName } from "@/types/icon/icon";

interface ParticipantCardProps {
  icon: IconName;
  title: string;
  number: number;
}

export const ParticipantCard = ({
  icon,
  title,
  number,
}: ParticipantCardProps) => {
  return (
    <Card>
      <div className="flex flex-row items-center justify-between pb-2">
        <p className="text-sm font-medium">{title}</p>
        <Icon className="h-4 w-4 text-blue-600" name={icon} />
      </div>

      <div>
        <p className="text-2xl font-semibold">{number}</p>
      </div>
    </Card>
  );
};
