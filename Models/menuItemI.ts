import { IconName } from "@/models/icon";

export interface MenuItemI {
  active?: boolean;
  aplicacion: string;
  bHoja: boolean;
  children?: MenuItemI[];
  cveAplicacion: string;
  cveMenu: string;
  cveMenuP: string;
  descMenu: string;
  icono: IconName;
  menuPadre: string;
  numNivel: string;
  urlMenu: string;
}
