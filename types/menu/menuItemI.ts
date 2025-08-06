import { IconName } from "@/types/icon";

export interface MenuItemI {
  active: boolean;
  bHoja: boolean;
  cveAplicacion: string;
  cveMenu: string;
  cveMenuP: string | null;
  descMenu: string;
  icono: IconName | null;
  numNivel: number;
  urlMenu: string | null;
  children: MenuItemI[] | null;
}
