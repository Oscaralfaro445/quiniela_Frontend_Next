"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/shared/button/Button";
import { Alert } from "@/components/alert/Alert";
import { AlertState } from "@/models/alert";

const initialValues = {
  email: "",
  username: "",
};

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(initialValues);
  const [alertState, setAlertState] = useState({
    type: AlertState.ERROR,
    title: "Hola",
    description: "Adios",
    isOpen: false,
  });

  // En axios el metodo get lleva 2 argumentos, URL y config
  const getProfile = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/v1/profile", {
        withCredentials: true,
      });
      setUser(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // El metodo post lleva 3 argumentos, URL, body, y config.
  const logoutProfile = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      setUser(initialValues);
      console.log(response);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleForm = () => {
    router.push("/dashboard/form");
  };

  return (
    <div className="flex flex-col w-full h-auto overflow-y-auto items-center justify-center">
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <button onClick={() => getProfile()}>Get profile</button>
      <button onClick={() => logoutProfile()}>Logout</button>
      <Button type="button" title="Form" onClick={handleForm} />
      <Alert
        type={alertState.type}
        title={alertState.title}
        description={alertState.description}
        isOpen={alertState.isOpen}
        toggleAlert={() => setAlertState({ ...alertState, isOpen: false })}
      />
    </div>
  );
}
