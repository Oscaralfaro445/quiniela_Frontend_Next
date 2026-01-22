"use client";

import { useCallback, useEffect, useState } from "react";
import { useGetMe } from "@/hooks/getMe/queries/useGetMe";
import { DataUser } from "@/types/user/dataUser";
import { Card } from "../card/Card";
import { Icon } from "../icon/Icon";

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

export const Timer = () => {
  const { data: user } = useGetMe();
  const userInfo: DataUser = user?.data?.[0];
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    total: 0,
  });

  const calculateTimeRemaining = useCallback((): TimeRemaining => {
    if (!userInfo?.fLimite || !userInfo?.horaLimite) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
    }

    try {
      const fechaLimite = new Date(
        `${userInfo.fLimite}T${userInfo.horaLimite}`,
      );
      const ahora = new Date();
      const diferencia = fechaLimite.getTime() - ahora.getTime();

      if (diferencia <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
      }

      const days = Math.floor(diferencia / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diferencia % (1000 * 60)) / 1000);

      return { days, hours, minutes, seconds, total: diferencia };
    } catch (error) {
      console.error("Error calculando tiempo restante:", error);
      return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
    }
  }, [userInfo?.fLimite, userInfo?.horaLimite]);

  useEffect(() => {
    const updateTimer = () => {
      const newTimeRemaining = calculateTimeRemaining();
      setTimeRemaining(newTimeRemaining);
    };

    updateTimer();

    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [userInfo?.fLimite, userInfo?.horaLimite, calculateTimeRemaining]);

  const isWithinTimeLimit = (): boolean => {
    return timeRemaining.total > 0;
  };

  const isTimeExpired = !isWithinTimeLimit();

  return (
    <section className="w-full max-w-[1280px] mx-auto px-10 py-8">
      <Card
        className={`${isTimeExpired ? "border-red-500" : "border-green-500"}`}
      >
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <Icon name={isTimeExpired ? "clock-alert" : "clock"} />

            <p
              className={`text-sm font-medium ${
                isTimeExpired ? "text-red-700" : "text-green-700"
              }`}
            >
              {isTimeExpired ? "Tiempo agotado" : "Tiempo restante"}
            </p>
          </div>

          {!isTimeExpired ? (
            <div className="bg-neutral-900 rounded-lg px-4 py-2 font-mono">
              <div className="flex items-center justify-center space-x-1 text-green-400">
                {timeRemaining.days > 0 && (
                  <>
                    <div className="text-center">
                      <div className="text-lg font-bold">
                        {timeRemaining.days.toString().padStart(2, "0")}
                      </div>
                      <div className="text-xs">días</div>
                    </div>
                    <div className="text-lg font-bold">:</div>
                  </>
                )}

                <div className="text-center">
                  <div className="text-lg font-bold">
                    {timeRemaining.hours.toString().padStart(2, "0")}
                  </div>
                  <div className="text-xs">hrs</div>
                </div>

                <div className="text-lg font-bold">:</div>

                <div className="text-center">
                  <div className="text-lg font-bold">
                    {timeRemaining.minutes.toString().padStart(2, "0")}
                  </div>
                  <div className="text-xs">min</div>
                </div>

                <div className="text-lg font-bold">:</div>

                <div className="text-center">
                  <div className="text-lg font-bold">
                    {timeRemaining.seconds.toString().padStart(2, "0")}
                  </div>
                  <div className="text-xs">seg</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-red-900 rounded-lg px-4 py-2 font-mono">
              <div className="text-red-400 text-center text-lg font-bold">
                00:00:00:00
              </div>
            </div>
          )}

          {userInfo?.fLimite && userInfo?.horaLimite && (
            <p
              className={`text-xs ${
                isTimeExpired ? "text-red-600" : "text-green-600"
              }`}
            >
              {`Límite: ${userInfo?.fLimite} ${userInfo?.horaLimite}`}
            </p>
          )}
        </div>
      </Card>
    </section>
  );
};
