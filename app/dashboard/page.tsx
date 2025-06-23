"use client";

import { useState } from "react";
import { Alert } from "@/components/alert/Alert";
import { AlertState } from "@/models/alert";

export default function Dashboard() {
  const [alertState, setAlertState] = useState({
    type: AlertState.ERROR,
    title: "Hola",
    description: "Adios",
    isOpen: false,
  });

  return (
    <div className="flex flex-col w-full h-full p-10 overflow-y-auto items-center justify-center">
      <h1>Dashboard</h1>

      {/* <Alert
        type={alertState.type}
        title={alertState.title}
        description={alertState.description}
        isOpen={alertState.isOpen}
        toggleAlert={() => setAlertState({ ...alertState, isOpen: false })}
      /> */}
    </div>
  );
}
