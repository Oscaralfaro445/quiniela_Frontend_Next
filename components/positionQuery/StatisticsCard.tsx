import { Card } from "../shared/card/Card";
import { Icon } from "../shared/icon/Icon";

interface StatisticsCardProps {
  currentWeek: string | undefined;
}

export const StatisticsCard = ({ currentWeek }: StatisticsCardProps) => {
  return (
    <section>
      <div className="grid lg:flex w-full max-w-[1280px] mx-auto px-10 py-8 gap-4">
        <Card className="border-gray-200">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium text-gray-600">
              Total Participantes
            </div>
            <Icon name="trophy" className="text-blue-700" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">2,847</div>
            <p className="text-xs text-gray-600">+127 esta semana</p>
          </div>
        </Card>

        <Card className="border-gray-200">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium text-gray-600">
              Precisión Promedio
            </div>
            <Icon name="target" className="text-blue-700" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">64.2%</div>
            <p className="text-xs text-gray-600">Semana {currentWeek}</p>
          </div>
        </Card>

        <Card className="border-gray-200">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium text-gray-600">Tu Posición</div>
            <Icon name="medal" className="text-blue-700" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">#156</div>
            <p className="text-xs text-gray-600">↑ 23 posiciones</p>
          </div>
        </Card>
      </div>
    </section>
  );
};
