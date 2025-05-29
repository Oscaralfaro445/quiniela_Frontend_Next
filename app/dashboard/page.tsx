"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

const initialValues = {
  email: "",
  username: "",
};

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(initialValues);

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
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <button onClick={() => getProfile()}>Get profile</button>
      <button onClick={() => logoutProfile()}>Logout</button>
    </div>
  );
}
