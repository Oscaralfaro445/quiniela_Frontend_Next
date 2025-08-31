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
      <div className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="text-sm font-medium">{title}</div>
        <Icon className="h-4 w-4 text-blue-600" name={icon} />
      </div>

      <div>
        <div className="text-2xl font-semibold">{number}</div>
      </div>
    </Card>
  );
};
