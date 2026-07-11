"use client";

import { useEffect, useState } from "react";
import { useGetUserProfileEdit } from "@/hooks/queries/user/useGetUserProfileEdit";
import { useGetAvailableTeams } from "@/hooks/queries/user/useGetAvailableTeams";
import { useGetMe } from "@/hooks/queries/user/useGetMe";
import { useUpdateUserProfileEdit } from "@/hooks/mutations/user/useUpdateUserProfileEdit";
import { Button } from "@/components/shared/button/Button";
import { Icon } from "@/components/shared/icon/Icon";
import { Card } from "@/components/shared/card/Card";
import { PageHeader } from "@/components/shared/pageHeader/PageHeader";
import { InputCombo } from "@/components/shared/input/inputs/InputCombo";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ProfilePage() {
  const [editProfile, setEditProfile] = useState<boolean>(false);
  const [profileForm, setProfileForm] = useState({
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    equipoFavorito: 0,
  });

  const { data } = useGetUserProfileEdit();
  const { data: teamsData } = useGetAvailableTeams();
  const { data: userData } = useGetMe();
  const { mutate: updateProfile } = useUpdateUserProfileEdit();

  const profileData = data?.data?.[0];
  const userInfo = userData?.data?.[0];
  const availableTeams = teamsData?.data || [];

  useEffect(() => {
    if (!profileData) {
      return;
    }

    setProfileForm((prev) => ({
      ...prev,
      nombre: profileData.nombre ?? "",
      apellidoPaterno: profileData.apellidoPaterno ?? "",
      apellidoMaterno: profileData.apellidoMaterno ?? "",
      equipoFavorito: profileData.idEquipoFav ?? 0,
    }));
  }, [profileData]);

  const handleEditProfile = () => {
    if (editProfile && profileData) {
      setProfileForm((prev) => ({
        ...prev,
        nombre: profileData.nombre ?? "",
        apellidoPaterno: profileData.apellidoPaterno ?? "",
        apellidoMaterno: profileData.apellidoMaterno ?? "",
        equipoFavorito: profileData.idEquipoFav ?? 0,
      }));
    }

    setEditProfile((prev) => !prev);
  };

  const handleChangeTeam = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setProfileForm((prev) => ({
      ...prev,
      equipoFavorito: Number(event.target.value),
    }));
  };

  const handleSaveChanges = () => {
    if (!userInfo) return;

    updateProfile({
      idQuiniela: userInfo.idQuiniela,
      cveUsuario: userInfo.cveUsuario,
      apellidoPaterno: profileForm.apellidoPaterno,
      apellidoMaterno: profileForm.apellidoMaterno,
      nombre: profileForm.nombre,
      idEquipoFav: profileForm.equipoFavorito,
    });

    setEditProfile(false);
  };

  return (
    <div className="w-full px-4 py-8 max-w-4xl mx-auto">
      <Link
        className="flex gap-2 items-center hover:text-blue-600 transition duration-200"
        href={"/dashboard"}
      >
        <ArrowLeft />
        Volver
      </Link>

      <PageHeader
        title="Mi Perfil"
        text="Administra tu información personal y preferencias de la cuenta"
      />

      <div className="grid gap-8 mt-12">
        <Card>
          <div className="w-full">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-2xl font-bold text-neutral-900">
                  Información Personal
                </h2>
                <p className="text-sm text-neutral-500 mt-1">
                  Actualiza tu foto y datos personales
                </p>
              </div>
              <Button
                type="button"
                theme={editProfile ? "danger" : "primary"}
                title={editProfile ? "Cancelar" : "Editar Perfil"}
                onClick={handleEditProfile}
              />
            </div>

            <div className="flex gap-8 mb-8 pb-8 border-b border-neutral-200">
              <div className="flex flex-col items-center gap-2">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-neutral-200 to-neutral-300 flex items-center justify-center">
                  <Icon name="user" size={40} className="text-neutral-400" />
                </div>
                <p className="text-sm font-semibold text-neutral-900 mt-2">
                  {profileForm.nombre || "Usuario"}
                </p>
                <p className="text-xs text-neutral-500">Miembro desde 2025</p>
              </div>

              <div className="flex-1 grid gap-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
                    <Icon name="user" size={16} className="text-neutral-400" />
                    Nombre
                  </label>
                  <input
                    type="text"
                    placeholder="Juan"
                    value={profileForm.nombre}
                    onChange={(event) =>
                      setProfileForm((prev) => ({
                        ...prev,
                        nombre: event.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-neutral-300 rounded-md bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={!editProfile}
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
                    <Icon name="user" size={16} className="text-neutral-400" />
                    Apellido Paterno
                  </label>
                  <input
                    type="text"
                    placeholder="Perez"
                    value={profileForm.apellidoPaterno}
                    onChange={(event) =>
                      setProfileForm((prev) => ({
                        ...prev,
                        apellidoPaterno: event.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-neutral-300 rounded-md bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={!editProfile}
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
                    <Icon name="user" size={16} className="text-neutral-400" />
                    Apellido Materno
                  </label>
                  <input
                    type="text"
                    placeholder="Perez"
                    value={profileForm.apellidoMaterno}
                    onChange={(event) =>
                      setProfileForm((prev) => ({
                        ...prev,
                        apellidoMaterno: event.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-neutral-300 rounded-md bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={!editProfile}
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
                    <Icon
                      name="trophy"
                      size={16}
                      className="text-neutral-400"
                    />
                    Equipo Favorito
                  </label>
                  <InputCombo
                    id="equipoFavorito"
                    name="equipoFavorito"
                    data={availableTeams}
                    selected={profileForm.equipoFavorito}
                    disabled={!editProfile}
                    onChange={handleChangeTeam}
                  />
                </div>

                {/*  <div className="md:col-span-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
                    <Icon name="mail" size={16} className="text-neutral-400" />
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    placeholder="juan.perez@example.com"
                    value={profileForm.correo}
                    onChange={(event) =>
                      setProfileForm((prev) => ({
                        ...prev,
                        correo: event.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-neutral-300 rounded-md bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={!editProfile}
                  />
                </div> */}

                {editProfile && (
                  <div className="w-full">
                    <Button
                      type="button"
                      theme="primary"
                      title="Guardar cambios"
                      onClick={handleSaveChanges}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/*  <Card>
          <div className="w-full">
            <div className="mb-6">
              <div className="flex items-center gap-3">
                <Icon name="bell" size={24} className="text-blue-600" />
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900">
                    Notificaciones
                  </h2>
                  <p className="text-sm text-neutral-500 mt-1">
                    Configura cómo deseas recibir alertas
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 border-t border-neutral-200 pt-6">
              <div className="flex justify-between items-center p-4 hover:bg-neutral-50 rounded-lg transition-colors">
                <div>
                  <p className="font-semibold text-neutral-900">
                    Notificaciones por Email
                  </p>
                  <p className="text-sm text-neutral-500 mt-1">
                    Recibe actualizaciones en tu correo
                  </p>
                </div>
                <div className="w-12 h-7 bg-black rounded-full relative cursor-pointer">
                  <div className="absolute top-1 right-1 w-5 h-5 bg-white rounded-full"></div>
                </div>
              </div>

              <div className="flex justify-between items-center p-4 hover:bg-neutral-50 rounded-lg transition-colors">
                <div>
                  <p className="font-semibold text-neutral-900">
                    Notificaciones Push
                  </p>
                  <p className="text-sm text-neutral-500 mt-1">
                    Recibe alertas en tu navegador
                  </p>
                </div>
                <div className="w-12 h-7 bg-neutral-200 rounded-full relative cursor-pointer">
                  <div className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full"></div>
                </div>
              </div>

              <div className="flex justify-between items-center p-4 hover:bg-neutral-50 rounded-lg transition-colors">
                <div>
                  <p className="font-semibold text-neutral-900">
                    Recordatorios de Quiniela
                  </p>
                  <p className="text-sm text-neutral-500 mt-1">
                    Te recordamos antes de que cierre la semana
                  </p>
                </div>
                <div className="w-12 h-7 bg-black rounded-full relative cursor-pointer">
                  <div className="absolute top-1 right-1 w-5 h-5 bg-white rounded-full"></div>
                </div>
              </div>

              <div className="flex justify-between items-center p-4 hover:bg-neutral-50 rounded-lg transition-colors">
                <div>
                  <p className="font-semibold text-neutral-900">
                    Resultados en Vivo
                  </p>
                  <p className="text-sm text-neutral-500 mt-1">
                    Recibe actualizaciones durante los juegos
                  </p>
                </div>
                <div className="w-12 h-7 bg-black rounded-full relative cursor-pointer">
                  <div className="absolute top-1 right-1 w-5 h-5 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </Card> */}

        {/* <Card>
          <div className="w-full">
            <div className="mb-6">
              <div className="flex items-center gap-3">
                <Icon name="lock" size={24} className="text-blue-600" />
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900">
                    Seguridad
                  </h2>
                  <p className="text-sm text-neutral-500 mt-1">
                    Actualiza tu contraseña
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6 border-t border-neutral-200 pt-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
                  <Icon name="lock" size={16} className="text-neutral-400" />
                  Contraseña Actual
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
                  <Icon name="lock" size={16} className="text-neutral-400" />
                  Nueva Contraseña
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
                  <Icon name="lock" size={16} className="text-neutral-400" />
                  Confirmar Nueva Contraseña
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled
                />
              </div>

              <div className="pt-4">
                <Button
                  type="button"
                  theme="normal"
                  title="Cambiar Contraseña"
                />
              </div>
            </div>
          </div>
        </Card> */}
      </div>
    </div>
  );
}
